const { hexStripZeros } = require("ethers/lib/utils")

const main = async () => {
    const [deployer] = await hexStripZeros.ethers.getSigners();
    const accountBalance = await deployer.balance()
}