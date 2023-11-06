// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Semver } from "../../universal/Semver.sol";
import { OptimismPortal } from "../../L1/OptimismPortal.sol";
import { ProxyAdmin } from "../../universal/ProxyAdmin.sol";
import { L2OutputOracle } from "../../L1/L2OutputOracle.sol";
import { SystemConfig } from "../../L1/SystemConfig.sol";

/// @notice Hold the deployment bytecode
///         Separate from build contract to avoid bytecode size limitations
contract Build_OptimismPortal is Semver {
    constructor() Semver(1, 0, 0) {}

    /// @notice The create2 salt used for deployment of the contract implementations.
    function deployBytecode() public pure returns (bytes memory) {
        return type(OptimismPortal).creationCode;
    }
}
