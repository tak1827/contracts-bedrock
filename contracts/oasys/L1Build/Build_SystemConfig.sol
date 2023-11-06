// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Semver } from "../../universal/Semver.sol";
import { SystemConfig } from "../../L1/SystemConfig.sol";

/// @notice Hold the deployment bytecode
///         Separate from build contract to avoid bytecode size limitations
contract Build_SystemConfig is Semver {
    constructor() Semver(1, 0, 0) {}

    /// @notice The create2 salt used for deployment of the contract implementations.
    function deployBytecode() public pure returns (bytes memory) {
        return type(SystemConfig).creationCode;
    }
}
