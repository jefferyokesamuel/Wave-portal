const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log('Contract deployed to: ', waveContract.address);
    console.log('Contract deployed by: ', owner.address);
 
   
    //Testing the seed
    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();
     
    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    // Getting the conntract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance:", 
        hre.ethers.utils.formatEther(contractBalance)
    );

    //Sending a wave
    let trial = await waveContract.wave("hey")
    await trial.wait()

    //Gertting balance to see what happened
    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log("contractBalance: ", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves()
    console.log(allWaves);
    // let waveTest
    // waveTest = await waveContract.getTotalWaves()
    
    // let firstWave = await waveContract.wave()
    // await firstWave.wait()

    // firstWave = await waveContract.connect(randomPerson).wave()
    // await firstWave.wait()

    // waveTest = await waveContract.getTotalWaves()

    // let waveTxn = await waveContract.wave('Hey bro')
    // await waveTxn.wait()
 
    // waveTxn = await waveContract.wave('Big Man')
    // await waveTxn.wait()

    // waveTxn = await waveContract.wave('Developer')
    // await waveTxn.wait()

    // let wavetotal = await waveContract.getAllWaves()
    // console.log(wavetotal)
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();