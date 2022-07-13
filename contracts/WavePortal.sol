// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
 
import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] wavers;

    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    constructor() payable {
        console.log('Yooooo');
        seed = (block.timestamp + block.difficulty) % 100;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    function wave (string memory _message) public { 
    require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");
        lastWavedAt[msg.sender] = block.timestamp; 
        totalWaves +=1;   
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed < 50) {
            console.log("%s won!", msg.sender);
        }
        emit NewWave(msg.sender, block.timestamp, _message);
 
        uint256 prizeAmount = 0.0001 ether;  
        require(
            prizeAmount <= address(this).balance, 
            "Tried to withdraw more money than the contract has"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract."); 
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves () public view returns (uint256) {
        console.log('we have %d total waves', totalWaves);
        return totalWaves;
    
    }
}