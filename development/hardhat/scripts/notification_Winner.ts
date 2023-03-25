
import { ethers } from "hardhat";
import * as PushAPI from "@pushprotocol/restapi";

  //Contrato en Mumbai 23.03.2023
  const addressLotery = "0xd750F6F60Fb20aD99ffD02D88292d000E34423A5";

async function SedNotificacion() {

        const LotteryFactory = await ethers.getContractFactory("Lottery");
        const lottery = await LotteryFactory.attach(addressLotery);
        
        const filterWinner = await lottery.filters.eWinner()

        lottery.on(filterWinner, (evento)=>{ 

            const recepientAddress = evento
            console.log("Send Notification TO WINNER => ", recepientAddress);
            
            sendNotificationDeposit(recepientAddress)
            console.log("Exito!");
            
        })
   
}



const sendNotificationDeposit = async(recepientAddress:string) => {
    const signers = await ethers.getSigners();
    const _signer = signers[0];
    
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `You Win!`,
        body: ` Congratulations on winning the award! `
      },
      payload: {
        title: `You Win!`,
        body: `Congratulations on winning the award!`,
        cta: '',
        img: ''
      },
      recipients: 'eip155:80001:' + recepientAddress, // recipient address
      channel: 'eip155:80001:0x21aAf6e410c1896319C0F2c48f9DE06bD9904007', // your channel address
      env: 'staging'
    });

    console.log("apiResponse =>", apiResponse);
    

    }   



    
  catch (err) {
        console.error('Error: ', err);
    }
}

SedNotificacion()
