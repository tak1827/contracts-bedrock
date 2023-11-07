import { Contract, EventLog } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const loadContract = async (
  hre: HardhatRuntimeEnvironment,
  name: string
): Promise<Contract> => {
  const { deployments, ethers } = hre;
  const bL2OutputOracle = await deployments.get(name)
  return await ethers.getContractAt(name, bL2OutputOracle.address);
}

export const findEventByName = (events: EventLog[], ename: string): EventLog => {
  const e = events.find((e: EventLog) => e.eventName === ename)
  if (!e) throw new Error('No event found');
  return e;
};
