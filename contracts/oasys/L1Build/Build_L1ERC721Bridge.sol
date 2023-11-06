// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Semver } from "../../universal/Semver.sol";
import { ProxyAdmin } from "../../universal/ProxyAdmin.sol";
import { L1ERC721Bridge } from "../../L1/L1ERC721Bridge.sol";
import { L1CrossDomainMessenger } from "../../L1/L1CrossDomainMessenger.sol";

/// @notice Hold the deployment bytecode
///         Separate from build contract to avoid bytecode size limitations
contract Build_L1ERC721Bridge is Semver {
    constructor() Semver(1, 0, 0) {}

    /// @notice The create2 salt used for deployment of the contract implementations.
    function deployBytecode() public pure returns (bytes memory) {
        return type(L1ERC721Bridge).creationCode;
    }
}
