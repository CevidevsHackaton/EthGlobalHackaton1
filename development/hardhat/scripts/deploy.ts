

import { ethers } from 'hardhat'

async function deploy () {
    const LotteryFactory = await ethers.getContractFactory('Lottery');
    const lottery = await LotteryFactory.deploy(80);
    await lottery.deployed()
    
    console.log('Address del contrato =>>',lottery.address )
}

deploy()
    .then(() => process.exit(0))
    .catch(error => { console.error(error);  process.exit(1); });