

const provider = require('./services/provider');
const { triggerSandwichAttack } = require('./services/executor');
const logger = require('./utils/logger');
const { ethers } = require('ethers');

// Address for Uniswap V2 Router, a common target
const UNISWAP_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

// A simplified ABI for decoding Uniswap swap functions
const UNISWAP_ABI = [
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)"
];
const uniswapInterface = new ethers.Interface(UNISWAP_ABI);

logger.info("Red Team Bot starting up...");
logger.info("Monitoring mempool for potential targets...");

provider.on("pending", async (txHash) => {
    try {
        const tx = await provider.getTransaction(txHash);

        // --- FILTERING LOGIC ---
        if (tx && tx.to === UNISWAP_V2_ROUTER) {
            
            // Decode the transaction data
            const decodedData = uniswapInterface.parseTransaction({ data: tx.data });

            if (decodedData && decodedData.name === "swapExactTokensForETH") {
                const [amountIn, amountOutMin, path] = decodedData.args;
                const victimToken = path[0];

                logger.warn(`Potential Target Found!`);
                logger.info(`  - TX Hash: ${tx.hash}`);
                logger.info(`  - Victim Token: ${victimToken}`);
                logger.info(`  - Amount In: ${ethers.formatUnits(amountIn, 18)}`); // Assumes 18 decimals

                // --- ATTACK CONDITION ---
                // This is where your sophisticated logic goes.
                // For this example, we'll attack if the trade is over 1000 tokens.
                if (ethers.formatUnits(amountIn, 18) > 1000) {
                    // Launch the attack!
                    // We'll use 0.1 ETH for our front-run.
                    await triggerSandwichAttack(UNISWAP_V2_ROUTER, victimToken, "0.1");
                }
            }
        }
    } catch (err) {
        // Ignore errors for transactions that disappear from the mempool
    }
});