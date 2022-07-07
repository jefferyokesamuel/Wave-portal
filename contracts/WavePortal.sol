// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] wavers;

    constructor() {
        console.log('Yooooo');
    }

    function wave () public {
        totalWaves +=1;
        console.log('%s has waved', msg.sender);
        wavers.push(msg.sender);
    }

    function getTotalWaves () public view returns (uint256) {
        console.log('we have %d total waves', totalWaves);
        return totalWaves;
    
    }
}