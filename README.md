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
