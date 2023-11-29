import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./tasks/build-l1";

const NETWORK_URL: string = process.env.NETWORK_URL || "";
const DEPLOYER_KEY: string = process.env.DEPLOYER_KEY || "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const EXPLORE_API_KEY: string = process.env.EXPLORE_API_KEY || "";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
    },
    opstack: {
      url: 'http://127.0.0.1:8545',
      accounts: [DEPLOYER_KEY],
      gasPrice: 1000000000 // 1 gwai
    },
    any: {
      url: NETWORK_URL,
      accounts: [DEPLOYER_KEY]
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  namedAccounts: {
    deployer: { default: 0 },
    owner: { default: 1 },
    p2psequencer: { default: 2 },
    proposer: { default:3 },
    batcher: { default: 4 },
  },
  mocha: {
    timeout: 50000,
  },
  etherscan: {
    // BlockScout is also supported, functioning in the same manner as Etherscan.
    apiKey: EXPLORE_API_KEY,
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1_000
      }
    }
  },
};

export default config;
