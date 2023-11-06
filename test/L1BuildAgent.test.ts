import { expect } from "chai";
import { ethers } from "hardhat";

import { ZERO_ADDRESS, findEventByName } from "./utils";

describe("L1BuildAgent", function () {
  before(async function () {
    this.signers = await ethers.getSigners();
    this.vOwner = this.signers[1].address;
    this.sequencer = this.signers[2].address;
    this.batcher = this.signers[3].address;
    this.defaultConfig = {
      finalSystemOwner: this.vOwner,
      l2OutputOracleProposer: this.sequencer,
      l2OutputOracleChallenger: ZERO_ADDRESS,
      batchSenderAddress: this.batcher,
      l2BlockTime: 2,
      l2OutputOracleSubmissionInterval: 120,
      finalizationPeriodSeconds: 604800, // 7 days
      l2OutputOracleStartingBlockNumber: 0,
      l2OutputOracleStartingTimestamp: 0,
    }

    const bL2OutputOracle = await (await ethers.getContractFactory('Build_L2OutputOracle')).deploy();
    const bOptimismPortal = await (await ethers.getContractFactory('Build_OptimismPortal')).deploy();
    const bL1CrossDomainMessenger = await (await ethers.getContractFactory('Build_L1CrossDomainMessenger')).deploy();
    const bSystemConfig = await (await ethers.getContractFactory('Build_SystemConfig')).deploy();
    const bL1StandardBridge = await (await ethers.getContractFactory('Build_L1StandardBridge')).deploy();
    const bL1ERC721Bridge = await (await ethers.getContractFactory('Build_L1ERC721Bridge')).deploy();
    
    this.bAddrList = [bL2OutputOracle.target, bOptimismPortal.target, bL1CrossDomainMessenger.target, bSystemConfig.target, bL1StandardBridge.target, bL1ERC721Bridge.target];
    this.Agent = await ethers.getContractFactory('L1BuildAgent');
  });

  beforeEach(async function () {
    this.agent = await this.Agent.deploy(...this.bAddrList, ZERO_ADDRESS);
  });

  it('deploy', async function () {
    expect(await this.agent.version()).to.equal("2.0.0");
  });

  describe('build', function () {
    it('success: the owner of proxyAdmin is EOA, admin of all proxys are proxyAdmin', async function () {
      const chainId = 0x84;
      const receipt1 = await (await this.agent.build(chainId, this.defaultConfig)).wait();
      const e = findEventByName(receipt1.logs, 'Deployed') 
      const proxyAdmin = await ethers.getContractAt('ProxyAdmin', e.args?.proxyAdmin);
      // assert owner of proxyAdmin
      expect(await proxyAdmin.owner()).to.equal(this.vOwner);
      // assert admin of proxys
      for (let i = 0; i < e.args?.proxys.length; i++) {
        expect(await proxyAdmin.getProxyAdmin(e.args?.proxys[i])).to.equal(e.args?.proxyAdmin);
      }
      // assert batchInbox
      expect(e.args?.batchInbox).to.equal("0xfF0000000000000000000000000000000084ff00");
    });

    it('success: reuse same implementation', async function () {
      // build once
      const chainId1 = 132;
      const receipt1 = await (await this.agent.build(chainId1, this.defaultConfig)).wait();
      const e1 = findEventByName(receipt1.logs, 'Deployed')
      // build twice
      const chainId2 = 1324;
      const receipt2 = await (await this.agent.build(chainId2, this.defaultConfig)).wait();
      const e2 = findEventByName(receipt2.logs, 'Deployed')

      expect(e1.args?.impls).to.have.ordered.members(e2.args?.impls);
      expect(e1.args?.proxys).to.not.have.any.members(e2.args?.proxys);
    });
  });
});
