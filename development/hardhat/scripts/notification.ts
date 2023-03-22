import { ethers } from "hardhat";
import * as PushAPI from "@pushprotocol/restapi";

// Goerli
const addressLotery = "0x1b36d6663667588B389b1F54dC51F3431690e2ee"// "0x03394494c5CDb69f373312461D338F5a22656da9";



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


const sendNotificationAll = async() => {
    const signers = await ethers.getSigners();
    const _signer = signers[0];
    const wallet = _signer.address;

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
        channel: "eip155:5:0x70E24350DCA5C9EB381fE4bCf4474E27f1e66C12", // channel address
        env:"staging"
        });
    }   



    
  catch (err) {
        console.error('Error: ', err);
    }
}


getArrayParticipantesLottery()
sendNotificationAll();
