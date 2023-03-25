// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >0.8.10;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./DateTime.sol";
import "./RandomChainlink.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Lottery is DateTime, RandomChainlink, Pausable {
    using Strings for uint256;

    mapping(address => uint[]) private address_TO_id;
    mapping(uint => address) public id_TO_address;
    uint public pool;
    uint public costoMensual;
    uint public timestampNextLotery;
    uint public id;
    uint public idMomentoSorteo;

    address[] public winners;
    address private winner;
    uint public poolWinner; //win 95% pool

    event startLottery(uint indexed numberBlock);
    event depositLottery(address indexed user);

    constructor(uint _costoMensual) {
        costoMensual = _costoMensual;
        timeNextLotery();
        emit startLottery(block.number);
    }

    function getIDfromAddress(
        address _address
    ) public view returns (uint[] memory) {
        return address_TO_id[_address];
    }

    function lastwinner() public view returns (address) {
        uint numberAllWinners = winners.length;
        address vlastwinner = winners[numberAllWinners];

        return vlastwinner;
    }

    function increment() internal {
        id = id + 1;
    }

    receive() external payable {
        string memory res = string(
            abi.encodePacked("el monto requerido es ", costoMensual.toString())
        );
        require(msg.value == costoMensual, res);
        require(
            !paused(),
            "Se ha pausado los depositos, espera hasta que se reclame el premio con getWinner()"
        );

        pool = pool + msg.value;
        increment();
        address_TO_id[msg.sender].push(id);
        id_TO_address[id] = msg.sender;

        emit depositLottery(msg.sender);
    }

    // AUN NO SE HA IMPLEMENTADO UN SISTEMA DE SUSCRIPCION MENSUAL
    function suscripcion() public payable {
        string memory res = string(
            abi.encodePacked("el monto requerido es ", costoMensual.toString())
        );
        require(msg.value == costoMensual, res);
        require(
            !paused(),
            "Se ha pausado los depositos, espera hasta que se reclame el premio con getWinner()"
        );

        pool = pool + msg.value;
        increment();
        address_TO_id[msg.sender].push(id);
        id_TO_address[id] = msg.sender;

        emit depositLottery(msg.sender);
    }

    function timeNextLotery() private {
        _DateTime memory dt = parseTimestamp(block.timestamp);

        uint8 NextMonth;
        uint8 thisMoth = dt.month;

        if (thisMoth < 12) {
            NextMonth = thisMoth + 1;
        } else {
            NextMonth = 1;
        }

        // timestampNextLotery = toTimestamp(dt.year, NextMonth,1);
        timestampNextLotery = block.timestamp + 120;
    }

    // FUNCION QUE ELIGE UN NUMERO RANDOM Y LO GUARDA EN map_reqId_reqStatus[id].randomWords[0]
    function Random() public onlyOwner {
        require(
            block.timestamp > timestampNextLotery,
            "Aun no es momento de seleccionar un ganador"
        );
        require(id > 0, "No hay ningun participante");
        requestRandomWords();
        idMomentoSorteo = id;
        id = 0;
        _pause();
    }

    function getWinner() public onlyOwner {
        require(
            lastRequestId > 0,
            "Ejecuta la funcion Random y espera 3 bloques de confirmacion para ejecutar esta funcion"
        );
        uint idWinner = map_reqId_reqStatus[lastRequestId].randomWords[0] %
            idMomentoSorteo;

        winner = id_TO_address[idWinner];
        winners.push(winner);
        poolWinner = (pool * 95) / 100;

        pool = 0;
        lastRequestId = 0;

        timeNextLotery();
        notification(winner);
        withdrawWinner();

        emit startLottery(block.number);
        _unpause();
    }

    function withdrawWinner() internal returns (bool) {
        bool res = payable(winner).send(poolWinner);

        winner = address(0);
        poolWinner = 0;

        return res;
    }

    function notification(address _winner) internal {
        address CHANNEL_ADDRESS = 0x70E24350DCA5C9EB381fE4bCf4474E27f1e66C12;
        string memory Title = "You Win!";
        string memory Body = "Congratulations on winning the award!";

        // address Staging Ethereum contract - Goerli 0x87da9Af1899ad477C67FeA31ce89c1d2435c77DC
        // address Staging Polygon contract - Mumbai 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa

        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
            .sendNotification(
                CHANNEL_ADDRESS,
                _winner,
                bytes(
                    string(
                        abi.encodePacked("0", "+", "3", "+", Title, "+", Body)
                    )
                )
            );
    }
}

//remixd -s /home/danyr/proyectos/hackaton2/EthGlobalHackaton1/development/hardhat --remix-ide https://remix.ethereum.org
