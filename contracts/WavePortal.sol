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

    Wave[] waves;

    function wave (string memory _message) public {
        totalWaves +=1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001;
        wavers.push(msg.sender);
    }

    function getAllWaves () public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves () public view returns (uint256) {
        console.log('we have %d total waves', totalWaves);
        return totalWaves;
    
    }
}