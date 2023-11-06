import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const waitConfirmations = hre.network.name === "hardhat" || hre.network.name === "localhost" ? 0 : 2;

  const { deployer } = await getNamedAccounts();

  await deploy("Build_L2OutputOracle", {
    from: deployer,
    args: [],
    waitConfirmations,
    log: true,
    autoMine: true,
  });

  await deploy("Build_OptimismPortal", {
    from: deployer,
    args: [],
    waitConfirmations,
    log: true,
    autoMine: true,
  });

  await deploy("Build_L1CrossDomainMessenger", {
    from: deployer,
    args: [],
    waitConfirmations,
    log: true,
    autoMine: true,
  });

  await deploy("Build_SystemConfig", {
    from: deployer,
    args: [],
    waitConfirmations,
    log: true,
    autoMine: true,
  });

  await deploy("Build_L1StandardBridge", {
    from: deployer,
    args: [],
    waitConfirmations,
    log: true,
    autoMine: true,
  });

  await deploy("Build_L1ERC721Bridge", {
    from: deployer,
    args: [],
    waitConfirmations,
    log: true,
    autoMine: true,
  });

};
export default func;
func.tags = ["builds"];
