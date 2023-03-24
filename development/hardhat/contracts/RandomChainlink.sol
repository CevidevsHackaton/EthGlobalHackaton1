// SPDX-License-Identifier: MIT
// An example of a consumer contract that directly pays for each request.
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";


contract RandomChainlink is
    VRFV2WrapperConsumerBase,
    ConfirmedOwner
{
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled( uint256 requestId, uint256[] randomWords, uint256 payment);

    struct RequestStatus {
                            uint256 paid; // amount paid in link
                            bool fulfilled; // whether the request has been successfully fulfilled
                            uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public map_reqId_reqStatus; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 numWords = 1;

    // Address LINK - hardcoded for Goerli // Sepolia // Mumbai
    address linkAddress = 	0x326C977E6efc84E512bB9C30f76E30c160eD06FB;// 0x779877A7B0D9E8603169DdbD7836e478b4624789; // 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;

    // address WRAPPER - hardcoded for Goerli // Sepolia // Mumbai
    address wrapperAddress =  	0x708701a1DfF4f478de54383E49a627eD4852C816; // 0xab18414CD93297B0d12ac29E63Ca20f515b3DB46; // 0x99aFAf084eBA697E584501b8Ed2c0B37Dd136693;

    constructor()
        ConfirmedOwner(msg.sender)
        VRFV2WrapperConsumerBase(linkAddress, wrapperAddress)
    {}

    function requestRandomWords() public returns (uint256 requestId) {
        requestId  =  requestRandomness( callbackGasLimit, requestConfirmations, numWords );
        
        map_reqId_reqStatus[requestId] = RequestStatus({
                                                        paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
                                                        randomWords: new uint256[](0),
                                                        fulfilled: false
        });

        requestIds.push(requestId);
        lastRequestId  =  requestId;

        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords( uint256 _requestId, uint256[] memory _randomWords ) internal override {
        require(map_reqId_reqStatus[_requestId].paid > 0, "request not found");

        map_reqId_reqStatus[_requestId].fulfilled = true;
        map_reqId_reqStatus[_requestId].randomWords = _randomWords;

        emit RequestFulfilled( _requestId, _randomWords, map_reqId_reqStatus[_requestId].paid );
    }   

    function getRequestStatus( uint256 _requestId ) external view     returns (uint256 paid, bool fulfilled, uint256[] memory randomWords) {

        require(map_reqId_reqStatus[_requestId].paid > 0, "request not found");
        
        RequestStatus memory request = map_reqId_reqStatus[_requestId];
        
        return (request.paid, request.fulfilled, request.randomWords);
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
