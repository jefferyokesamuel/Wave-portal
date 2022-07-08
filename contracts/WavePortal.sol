// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
 
import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] wavers;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    constructor() {
        console.log('Yooooo');
    }

    Wave[] waves

    function wave (string memory _message) public {
        totalWaves +=1;
        console.log('%s has waved', msg.sender);
        wavers.push(msg.sender);
    }

    function getTotalWaves () public view returns (uint256) {
        console.log('we have %d total waves', totalWaves);
        return totalWaves;
    
    }
}