
import { ethers } from "hardhat";
import * as PushAPI from "@pushprotocol/restapi";

  //Contrato en Mumbai 23.03.2023
  const addressLotery = "0xd750F6F60Fb20aD99ffD02D88292d000E34423A5";

async function SedNotificacion() {

        const LotteryFactory = await ethers.getContractFactory("Lottery");
        const lottery = await LotteryFactory.attach(addressLotery);
      
        const filtroDepositos = await lottery.filters.depositLottery()

        lottery.on(filtroDepositos, (evento)=>{ 

          const recepientAddress = evento
          console.log("Send Notification TO =>", recepientAddress);
          
          sendNotificationDeposit(recepientAddress)
          console.log("Exito!");
            
        })

   
}


const sendNotificationDeposit = async(recepientAddress: string) => {
    const signers = await ethers.getSigners();
    const _signer = signers[0];

  try {
          const apiResponse = await PushAPI.payloads.sendNotification({
          signer: _signer,
          type: 3, // target
          identityType: 2, // direct payload
          notification: {
            title: `Congratulations on Your Lottery Ticket Purchase !!`,
            body: ` We wish you the best of luck in the upcoming drawing. `
          },
          payload: {
            title: `Congratulations on Your Lottery Ticket Purchase!!`,
            body: ` We wish you the best of luck in the upcoming drawing. `,
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
