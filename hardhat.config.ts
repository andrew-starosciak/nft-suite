import * as dotenv from "dotenv";
import { HardhatUserConfig, HardhatRuntimeEnvironment } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
// const { ethers } = require("hardhat");
const { task } = require("hardhat/config");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task(
  "accounts",
  "Prints the list of accounts",
  async (_: any, hre: HardhatRuntimeEnvironment) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

task("balances", "Prints the list of accounts with their ETH balance")
  .addParam("n", "Network")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const network = taskArgs.n;
    const provider = await hre.ethers.getDefaultProvider(network);
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(
        account.address,
        hre.ethers.utils.formatEther(
          await provider.getBalance(account.address)
        ),
        "ETH"
      );
    }
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      saveDeployments: true,
    },
    hardhat: {
      // forking: {
      //   url: process.env.ALCHEMY_PROVIDER,
      //   blockNumber: 12802046,
      // },
      mining: {
        auto: true,
        // interval: 0,
      },
    },
    // ropsten: {
    //   url: process.env.ROPSTEN_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      4: 0,
    },
    adminAddress: {
      default: 0, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      // 1: process.env.MAINNET_ADMIN, // on the mainnet the feeCollector could be a multi sig
      // 4: process.env.RINKEBY_ADMIN,
    },
    treasuryAddress: {
      default: 1,
      // 1: process.env.MAINNET_TREASURY, // on the mainnet the feeCollector could be a multi sig
      // 4: process.env.RINKEBY_TREASURY,
    },
    owner: {
      default: process.env.OWNER as string,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: "./deploy",
  },
};

export default config;
