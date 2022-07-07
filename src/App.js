import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    //First make sure we have access to window.ethereum
   try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  // Check if we can access the users Wallet

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if(accounts.length !== 0) {
      const account = accounts[0]
     console.log("Found an authorised account", account)
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    } 
    }catch (error) {
    console.log(error);
    }
  }
  //Connecting to the Wallet
  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert("Get MetaMask")
        return
      }
    
      const accounts = await ethereum.request({ method: "eth_requestAccounts"})
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  //This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        Welcome to the Wave Portal👨🏾‍💻👋 
        </div>

        <div className="bio">
          Hey im Jeffery a Blockchain Developer, I love building Dope projects, You can connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={null}>
          Wave at Me
        </button>
      </div>
    </div>
  );

}

export default App