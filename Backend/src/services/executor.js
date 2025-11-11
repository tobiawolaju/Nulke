const { ethers } = require("ethers");
const wallet = require("./wallet");
const logger = require("../utils/logger");
require("dotenv").config();

// You need the ABI (Application Binary Interface) of your Executor contract
// After compiling in the /Contract directory, copy the ABI from:
// /Contract/artifacts/contracts/Executor.sol/Executor.json
const executorAbi = [ /* PASTE YOUR ABI ARRAY HERE */ ];

const executorContract = new ethers.Contract(
    process.env.EXECUTOR_CONTRACT_ADDRESS,
    executorAbi,
    wallet
);

async function triggerSandwichAttack(routerAddress, tokenAddress, ethAmount) {
    try {
        logger.info(`Triggering sandwich attack on token ${tokenAddress} with ${ethAmount} ETH.`);
        
        const tx = await executorContract.executeSandwich(
            routerAddress,
            tokenAddress,
            ethers.parseEther(ethAmount),
            {
                value: ethers.parseEther(ethAmount),
                gasLimit: 300000 // Set a reasonable gas limit
            }
        );

        logger.info(`Attack transaction sent: ${tx.hash}`);
        const receipt = await tx.wait();
        logger.info(`Attack transaction confirmed in block: ${receipt.blockNumber}`);
        return receipt;

    } catch (error) {
        logger.error(`Sandwich attack failed: ${error.message}`);
        return null;
    }
}

module.exports = { triggerSandwichAttack };
