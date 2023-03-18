// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const contractName = "Lock"

  const Contract = await hre.ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(contractName, " deployed to:", contract.address);

  let config = `
  export const abi${contractName} = "${contract.address}"
  `;

  let data = JSON.stringify(config);
  fs.writeFileSync("../web/config.js", JSON.parse(data));

  fs.copyFile(
    `./artifacts/contracts/${contractName}.sol/${contractName}.json`,
    `../web/utils/abi/${contractName}.json`,
    (err) => {
      if (err) {
        console.log("Error Occurred:", err);
      }
    }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
