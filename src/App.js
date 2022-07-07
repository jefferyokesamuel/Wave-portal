import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = () => {
    /*
    * First make sure we have access to window.ethereum
    */
   
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  }
  // CHeck if we can access the users Wallet
  const accounts = await ethereum.request({ method: "eth_accounts" });

  if(accounts.length !== 0) {
    const account = accounts[0]
    console.log("Found an authorised account", account)
    setCurrentAccount(account)
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