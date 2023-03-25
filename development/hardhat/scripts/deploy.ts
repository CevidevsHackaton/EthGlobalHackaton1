

import { ethers } from 'hardhat'

async function deploy() {
  const LoteryFactory = await ethers.getContractFactory('Lottery');
  const lotery = await LoteryFactory.deploy(ethers.utils.parseEther("8"));
  await lotery.deployed()

  console.log('Address del contrato =>>', lotery.address)
}

deploy()
  .then(() => process.exit(0))
  .catch(error => { console.error(error); process.exit(1); });