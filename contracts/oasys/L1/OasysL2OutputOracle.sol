// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { L2OutputOracle } from "../../L1/L2OutputOracle.sol";

/// @custom:proxied
/// @title OasysL2OutputOracle
/// @notice Extend the OptimismPortal to controll L2 timestamp and block number
contract OasysL2OutputOracle is L2OutputOracle {

    /// @notice Assign fresh number due to oasys custom logic
    /// @custom:semver 1.0.0
    // string public constant version = "1.0.0";

    constructor(uint256 _submissionInterval, uint256 _l2BlockTime, uint256 _finalizationPeriodSeconds) L2OutputOracle(_submissionInterval, _l2BlockTime, _finalizationPeriodSeconds) {}

    /// @notice Override to pass zero value of `startingBlockNumber` and `startingTimestamp`
    function initialize(
        address _proposer,
        address _challenger
    )
        public
    {
        // pass zero value of `startingBlockNumber` and `startingTimestamp`
        initialize(
            0, // startingBlockNumber
            0, // startingTimestamp
            _proposer,
            _challenger
        );
    }

    /// @notice Overrite to compute l2 block number and timestamp when the first l2 block is submitted
    function proposeL2Output(
        bytes32 _outputRoot,
        uint256 _l2BlockNumber,
        bytes32 _l1BlockHash,
        uint256 _l1BlockNumber
    )
        public
        override
        payable
    {
        // compute l2 block number and timestamp when the first l2 block is submitted
        if (latestBlockNumber() == 0) {
            startingBlockNumber = _l2BlockNumber - SUBMISSION_INTERVAL;
            startingTimestamp = block.timestamp - L2_BLOCK_TIME*SUBMISSION_INTERVAL - 1;
        }

        super.proposeL2Output(
            _outputRoot,
            _l2BlockNumber,
            _l1BlockHash,
            _l1BlockNumber
        );
    }

//     // /// @notice Returns the L2 timestamp corresponding to a given L2 block number.
//     // /// @param _l2BlockNumber The L2 block number of the target block.
//     // /// @return L2 timestamp of the given block.
//     // function computeL2Timestamp(uint256 _l2BlockNumber) public override view returns (uint256) {
//     //     if (l2Outputs.length == 0) {
//     //         return 0;
//     //     }
//     //     return l2Outputs[l2Outputs.length - 1].timestamp - SUBMISSION_INTERVAL*L2_BLOCK_TIME
//     // }
}
