import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./tasks/build-l1";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
    },
    localhost: {
      url: 'http://localhost:8545',
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  namedAccounts: {
    deployer: { default: 0 },
    owner: { default: 1 },
    sequencer: { default: 2 },
    batcher: { default: 3 },
  },
  mocha: {
    timeout: 50000,
  },
  etherscan: {
    // BlockScout is also supported, functioning in the same manner as Etherscan.
    apiKey: process.env.BLOCKSCOUT_API_KEY,
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
