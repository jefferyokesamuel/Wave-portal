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

    constructor() payable {
        console.log('Yooooo');
    }

    Wave[] waves;

    function wave (string memory _message) public { 
        totalWaves +=1;    
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
 
        uint256 prizeAmount = 0.0001 ether;  
        require(
            prizeAmount <= address(this).balance, 
            "Tried to withdraw more money than the contract has"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract."); 
    }

    function getAllWaves () public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves () public view returns (uint256) {
        console.log('we have %d total waves', totalWaves);
        return totalWaves;
    
    }
}