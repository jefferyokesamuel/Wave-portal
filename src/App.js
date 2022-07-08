import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [allWaves, setAllWaves] = useState([])
  const contractAddress = "0x0694C53eACe6668B84942D250F2262c90BF2A5cc"
  const contractABI = abi.abi


  const getAllWaves = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = wavePortalContract.getAllWaves()

        //Cleaning up the returned array for the UI
      } else {
        console.log('Ethereum object does not exist')
      }


    }
  }
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();

          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
          let count = await wavePortalContract.getTotalWaves();
          console.log("Retrieved total wave count...", count.toNumber());

          //Executing Waves in the Contract
          const waveTxn = await wavePortalContract.wave()
          console.log('Mining...', waveTxn.hash)

          await waveTxn.wait()
          console.log('Mined', waveTxn.hash)

          count = await wavePortalContract.getTotalWaves()
          console.log('Retrieved total wave count', count.toNumber())
        } else {
            console.log("Ethereum object doesn't exist!");
          }

      } catch (error) {
        console.log(error);
      }
    }
  

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        Yoo Welcome to the Wave Portal 👨🏾‍💻👋
        </div>

        <div className="bio">
          Hey, Im Jeffery a Blockchain Developer, Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
        
}
export default App