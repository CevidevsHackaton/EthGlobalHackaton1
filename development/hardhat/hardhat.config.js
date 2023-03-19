require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url:'https://eth-goerli.g.alchemy.com/v2/fXJSVcg4rZ0B4FAH3OoEIyI0p3xQX9XS',
      accounts: [
        '10c6f93748d9adecd61510850ed7a87a62a1a86bf66ae181b97ea536d07525c2'
      ]
    }
  }
};
