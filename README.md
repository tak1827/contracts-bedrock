# contracts-bedrock
The opstack bedrock versions of contracts is scheduled for deployment on the Oasys blockchain platform.
The referenced version of Opstack is [v1.1.6](https://github.com/ethereum-optimism/optimism/tree/v1.1.6/packages/contracts-bedrock)

<!-- # PreRequirements
|  Software  |  Version  |
| ---- | ---- |
|  Node  |  ^v16.x  | -->

# Getting Started
```sh
# install dependencies
yarn install

# edit env
cp .env.example .env

# compile contracts
yarn build

# deploy contracts
npx hardhat deploy --network any

# build contracts on l1
npx hardhat buildl1 --network any --chain-id 12..  --owner 0x00.. --proposer 0x00.. --batcher 0x00..
```

# Building Bedrock contracts on L1
The deployment process for the contract set is guided by the [script](https://github.com/ethereum-optimism/optimism/blob/v1.1.6/packages/contracts-bedrock/scripts/Deploy.s.sol#L67) found in the Opstack repository. The Bedrock contract set remains largely consistent with the original version, with modifications specific to our needs denoted by the `// CUSTOM:OASYS` comment.

The [L1BuildAgent](./contracts/oasys/L1Build/L1BuildAgent.sol) serves as the entry point contract and is the updated version of a currently active contract with the same name deployed on L1. The L1BuildAgent's role is to deploy the series of contracts listed below.
- [OptimismPortal](./contracts/L1/OptimismPortal.sol)
- [L2OutputOracle](./contracts/L1/L2OutputOracle.sol)
- [SystemConfig](./contracts/L1/SystemConfig.sol)
- [L1CrossDomainMessenger](./contracts/L1/L1CrossDomainMessenger.sol)
- [L1StandardBridge](./contracts/L1/L1StandardBridge.sol)
- [L1ERC721Bridge](./contracts/L1/L1ERC721Bridge.sol)
During the deployment, rather than deploying the entire contract set, we primarily deploy proxy contracts and perform initializations—except during the first deployment, when the implementation contracts are also deployed. By adopting the proxy pattern, the owner address is empowered to upgrade any of these contracts. The true custodian of the contracts is the [ProxyAdmin](./contracts/universal/ProxyAdmin.sol) contract, which means that the actual ownership lies with the ProxyAdmin's owner. Upgrades are conducted through the ProxyAdmin, which sends transactions to the individual proxies.
