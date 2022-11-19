require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter")
require("solidity-coverage");

const goerli = process.env.GOERLI_URL;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: goerli,
      accounts: [privateKey],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "gas-report.txt",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_KEY,
    token: "MATIC"
  }
};
