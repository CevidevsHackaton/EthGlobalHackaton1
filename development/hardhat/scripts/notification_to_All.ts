import { ethers } from "hardhat";
import * as PushAPI from "@pushprotocol/restapi";

// Goerli
// const addressLotery = "0x1b36d6663667588B389b1F54dC51F3431690e2ee"// "0x03394494c5CDb69f373312461D338F5a22656da9";


//Contrato en Mumbai 23.03.2023
  const addressLotery = "0xd750F6F60Fb20aD99ffD02D88292d000E34423A5";


const sendNotificationAll = async() => {
    const signers = await ethers.getSigners();
    const _signer = signers[0];
    

  try {
        const apiResponse = await PushAPI.payloads.sendNotification({
        signer: _signer,
        type: 1, 
        identityType: 2, // direct payload
        notification: {
            title: `notification SDK: You Win!`,
            body: `Congratulations on winning the award!`
        },

        payload: {
            title: `payload SDK: You Win!`,
            body: `Congratulations on winning the award!`,
            cta: '',
            img: ''
          },
        
        // eip155:   80001:Mumbai   1:ethereum   5:goerli
        channel: "eip155:80001:0x21aAf6e410c1896319C0F2c48f9DE06bD9904007", // channel address
        env:"staging"
        });

        console.log("apiResponse => ", apiResponse);
    }   

    
  catch (err) {
        console.error('Error: ', err);
    }
}








async function getArrayParticipantesLottery() {
  const signers = await ethers.getSigners();
  const signer = signers[0];
  const wallet = signer.address;

  const LotteryFactory = await ethers.getContractFactory("Lottery");
  const lottery = await LotteryFactory.attach(addressLotery);

  
  const arraystartLottery = await lottery.queryFilter("startLottery");
  const arrayNumberBlock = arraystartLottery.map(elemento => elemento.blockNumber)

  console.log(arrayNumberBlock);

  const nBloqueInicial = arrayNumberBlock[arrayNumberBlock.length-1]
  const nBloqueFinal = await ethers.provider.getBlockNumber();
  
  console.log("nBloqueInicial => ", nBloqueInicial);
  console.log("nBloqueFinal => ", nBloqueFinal);

  const ListaUsuarios = await lottery.queryFilter( "depositLottery", nBloqueInicial, nBloqueFinal);
  const arrayAddressUsers = ListaUsuarios.map(element => element.args[0])
  
  console.log("arrayAddressUsers => ", arrayAddressUsers);
  return arrayAddressUsers
}




getArrayParticipantesLottery()
sendNotificationAll();
