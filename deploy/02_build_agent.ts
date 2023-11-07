import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { loadContract, ZERO_ADDRESS } from '../src/utils'

const BUILD_AGENT_V1_ADDRESS: string =
  process.env.BUILD_AGENT_V1_ADDRESS || ZERO_ADDRESS

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const waitConfirmations =
    hre.network.name === 'hardhat' || hre.network.name === 'localhost' ? 0 : 2

  const bL2OutputOracle = await loadContract(hre, 'Build_L2OutputOracle')
  const bOptimismPortal = await loadContract(hre, 'Build_OptimismPortal')
  const bL1CrossDomainMessenger = await loadContract(
    hre,
    'Build_L1CrossDomainMessenger'
  )
  const bSystemConfig = await loadContract(hre, 'Build_SystemConfig')
  const bL1StandardBridge = await loadContract(hre, 'Build_L1StandardBridge')
  const bL1ERC721Bridge = await loadContract(hre, 'Build_L1ERC721Bridge')

  await deploy('L1BuildAgent', {
    from: deployer,
    args: [
      bL2OutputOracle.target,
      bOptimismPortal.target,
      bL1CrossDomainMessenger.target,
      bSystemConfig.target,
      bL1StandardBridge.target,
      bL1ERC721Bridge.target,
      BUILD_AGENT_V1_ADDRESS,
    ],
    waitConfirmations,
    log: true,
    autoMine: true,
  })
}
export default func
func.tags = ['agent']
