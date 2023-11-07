import { task } from "hardhat/config";
import { EventLog } from "ethers";
import * as types from 'hardhat/internal/core/params/argumentTypes'
import { loadContract, ZERO_ADDRESS, findEventByName } from "../src/utils"

task("buildl1", "Deploy Verse build contract set on L1")
  .addParam("chainId", "The chain id of Verse, This must be unique", undefined, types.int)
  .addParam("owner", "The `finalSystemOwner` having privilege to upgrade contracts", undefined, types.string, true)
  .addParam("proposer", "l2OutputOracleProposer", undefined, types.string, true)
  .addParam("batcher", "batchSenderAddress", undefined, types.string, true)
  .addParam("l2BlockTime", "l2BlockTime", 2, types.int, true)

  .setAction(async (args, hre) => {
    const { getNamedAccounts } = hre;
    const { owner, sequencer, batcher } = await getNamedAccounts();
    const config = {
      finalSystemOwner: args.owner ? args.owner : owner,
      l2OutputOracleProposer: args.sequencer ? args.sequencer : sequencer,
      l2OutputOracleChallenger: ZERO_ADDRESS,
      batchSenderAddress: args.batcher ? args.batcher : batcher,
      l2BlockTime: args.l2BlockTime,
      l2OutputOracleSubmissionInterval: 120,
      finalizationPeriodSeconds: 604800, // 7 days
      l2OutputOracleStartingBlockNumber: 0,
      l2OutputOracleStartingTimestamp: 0,
    }

    // assert config
    if (config.finalSystemOwner === undefined) throw new Error("owner is undefined");
    if (config.l2OutputOracleProposer === undefined) throw new Error("proposer is undefined");
    if (config.batchSenderAddress === undefined) throw new Error("batcher is undefined");

    console.log("config:", config);
    
    const agent = await loadContract(hre, "L1BuildAgent");
    const receipt = await (await agent.build(args.chainId, config)).wait();

    const e = findEventByName(receipt!.logs as EventLog[], 'Deployed')
    console.log(`
Deployed contracts:
  OptimismPortal:         ${e.args?.proxys[0]}
  L2OutputOracle:         ${e.args?.proxys[1]}
  SystemConfig:           ${e.args?.proxys[2]}
  L1CrossDomainMessenger: ${e.args?.proxys[3]}
  L1StandardBridge:       ${e.args?.proxys[4]}
  L1ERC721Bridge:         ${e.args?.proxys[5]}

BatchInbox: ${e.args?.batchInbox}
`)
    
  });
