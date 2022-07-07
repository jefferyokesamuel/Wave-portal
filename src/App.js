import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        Yoooo welcome to the Wave Portal 👨🏾‍💻👋
        </div>

        <div className="bio">
        Hey im Jeffery a Blockchain Developer, Connect your Ethereum wallet and wave at me!
        </div>
 
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
