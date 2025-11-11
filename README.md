### `README.md`

You can create a `README.md` file in your root `MonadTradingBot/` directory and paste the following content into it.

````markdown
# Monad Trading Bot - Red Team Security Testing Platform

## Project Goal

The primary goal of this project is to develop a sophisticated bot for red team security analysis of our memetrading platform. This tool is designed to simulate real-world Maximal Extractable Value (MEV) attacks, specifically front-running and sandwich attacks, in a controlled environment.

By proactively testing our platform's resilience against these common on-chain threats, we can identify and mitigate critical vulnerabilities before they are exploited by malicious actors. The bot serves as an internal security measure to ensure the robustness of our smart contracts, detect economic exploits, and ultimately protect our users' funds.

This platform is strictly for **security research and internal testing purposes** on a forked mainnet environment.

---

## File Structure

```
MonadTradingBot/
│
├── README.md                   # Project documentation
│
├── Contract/                   # Smart Contracts + Hardhat
│   │
│   ├── hardhat.config.ts       # Hardhat config file
│   ├── package.json            # Node dependencies for contracts
│   ├── tsconfig.json           # TypeScript config for contracts
│   ├── .env                    # RPC URLs, private keys, etc.
│   │
│   ├── contracts/              # Solidity smart contracts
│   │     Executor.sol          # On-chain attack execution contract
│   │
│   ├── ignition/               # Hardhat Ignition deployment modules
│   │     modules/
│   │         ExecutorModule.ts # Deployment script for Executor.sol
│   │
│   └── test/                   # Hardhat tests for the contract
│         Executor.test.ts      # Unit and integration tests
│
├── Backend/                    # Node.js backend trading bot
│   │
│   ├── package.json
│   ├── .env                    # RPC, private key, contract addresses
│   ├── index.js                # Entry point for the bot
│   │
│   ├── services/               # Core bot services
│   │     provider.js           # Provider setup (WebSocket)
│   │     wallet.js             # Wallet connection / signing
│   │     executor.js           # Contract interaction logic
│   │
│   └── utils/                  # Utilities
│         logger.js             # Logging service
│
└── Frontend/                   # (Future Development) React + Vite frontend
    └── ...
```
````

---

## How to Test the Bot: A Step-by-Step Guide

Testing this system involves three main stages:
1.  **Unit Testing the Contract:** Ensure the `Executor.sol` contract works perfectly in isolation.
2.  **Setting Up the Integrated Environment:** Run a local mainnet fork and deploy the contract to it.
3.  **Running an End-to-End Test:** Simulate a victim transaction on your local fork and watch your backend bot catch it and execute the attack via the smart contract.

### Stage 1: Unit Testing the `Executor` Contract

Before you even involve the backend, you must be confident your on-chain weapon works.

1.  **Navigate to the `Contract` directory:**
    ```bash
    cd Contract
    ```

2.  **Create a test file `test/Executor.test.ts`:**
    This test will deploy your `Executor` contract, impersonate a Uniswap user, and check if your contract can successfully perform a sandwich attack on the local fork.

    **`test/Executor.test.ts`**
    ```typescript
    import { expect } from "chai";
    import { ethers, network } from "hardhat";
    import { Signer } from "ethers";

    describe("Executor Contract", function () {
      it("Should be able to perform a basic swap", async function () {
        const [owner] = await ethers.getSigners();
        const executorFactory = await ethers.getContractFactory("Executor");
        const executor = await executorFactory.deploy();
        
        // Mainnet addresses
        const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        const UNI_TOKEN_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
        const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

        const executorOwner = await executor.owner();
        expect(executorOwner).to.equal(owner.address);

        // Check initial ETH balance of the contract
        const initialBalance = await ethers.provider.getBalance(await executor.getAddress());
        expect(initialBalance).to.equal(0);
        
        // Send 1 ETH to the contract to perform the attack
        const attackAmount = ethers.parseEther("1.0");
        
        // This test only verifies the swap logic, not a full sandwich
        await executor.connect(owner).executeSandwich(
            UNISWAP_ROUTER_ADDRESS,
            UNI_TOKEN_ADDRESS,
            attackAmount,
            { value: attackAmount }
        );

        // After the front-run and back-run, the contract should have roughly the same ETH back
        const finalBalance = await ethers.provider.getBalance(await executor.getAddress());
        
        // In a real test without a victim, you lose money to fees/slippage
        // So we expect the final balance to be slightly less than the initial attack amount.
        expect(finalBalance).to.be.lt(attackAmount);
        console.log(`ETH spent on swap fees/slippage: ${ethers.formatEther(attackAmount - finalBalance)}`);
      });
    });
    ```

3.  **Run the Test:**
    This command will automatically start a temporary Hardhat fork, deploy your contract, run the test, and then shut down.
    ```bash
    npx hardhat test
    ```
    If the test passes, you know your contract's swapping logic is sound.

### Stage 2: Setting Up the Integrated Testing Environment

Now, we create a persistent local blockchain that both your contract and backend can talk to.

1.  **Start the Local Mainnet Fork:**
    In your `Contract` directory terminal, run this command. It will use your `hardhat.config.ts` to create the fork.
    ```bash
    npx hardhat node
    ```
    **Keep this terminal running.** It is now your personal Ethereum mainnet, frozen at the block number you specified. Hardhat will print a list of available test accounts and their private keys.

2.  **Deploy the `Executor` Contract to the Fork:**
    Open a **second terminal** and navigate back to the `Contract` directory.
    ```bash
    cd Contract
    ```
    Now, deploy your contract to the local node you just started.
    ```bash
    npx hardhat ignition deploy ./ignition/modules/ExecutorModule.ts --network localhost
    ```
    Ignition will output the deployed address of your `Executor` contract. **Copy this address.**

### Stage 3: End-to-End Test Simulation

This is the final test where everything comes together.

1.  **Configure the Backend:**
    Navigate to the `Backend` directory.
    ```bash
    cd ../Backend
    ```
    Open the `.env` file and configure it to point to your local Hardhat node and the contract you just deployed.

    **`Backend/.env`**
    ```
    # Use the WebSocket URL for your LOCAL Hardhat Node
    MAINNET_WSS_URL="ws://127.0.0.1:8545"

    # Use one of the private keys provided by the `npx hardhat node` command
    PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

    # PASTE THE CONTRACT ADDRESS FROM THE DEPLOYMENT STEP
    EXECUTOR_CONTRACT_ADDRESS="0x..." 
    ```

2.  **Start the Bot:**
    In your `Backend` directory terminal, start the bot. It will now connect to your local Hardhat fork and start monitoring its (currently empty) mempool.
    ```bash
    node index.js
    ```
    You should see the "Bot starting up..." message.

3.  **Simulate a "Victim" Transaction:**
    Now, we need to create a transaction that your bot will identify as a target. We will do this using a Hardhat script.

    a. Open a **third terminal** and navigate to the `Contract` directory.

    b. Create a new file `scripts/simulateVictim.ts`. This script will impersonate an account and execute a large swap on Uniswap *on your local fork*.

    **`Contract/scripts/simulateVictim.ts`**
    ```typescript
    import { ethers } from "hardhat";

    async function main() {
        const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        const SOME_TOKEN_ADDRESS = "0x...YOUR_TARGET_TOKEN_ADDRESS..."; // e.g., UNI token
        const WHALE_ADDRESS = "0x...ADDRESS_OF_A_KNOWN_TOKEN_HOLDER...";

        // Impersonate a whale account that holds the token
        const whaleSigner = await ethers.getImpersonatedSigner(WHALE_ADDRESS);

        const tokenContract = await ethers.getContractAt("IERC20", SOME_TOKEN_ADDRESS, whaleSigner);
        const routerContract = await ethers.getContractAt("IUniswapV2Router02", UNISWAP_ROUTER_ADDRESS, whaleSigner);

        const amountToSwap = ethers.parseUnits("5000", 18); // A large amount to trigger the bot

        // Approve the router to spend the whale's tokens
        await tokenContract.approve(UNISWAP_ROUTER_ADDRESS, amountToSwap);
        console.log("Approval successful.");

        // Execute the swap
        console.log(`Simulating victim swap of 5000 tokens...`);
        const tx = await routerContract.swapExactTokensForETH(
            amountToSwap,
            0,
            [SOME_TOKEN_ADDRESS, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"],
            whaleSigner.address,
            Math.floor(Date.now() / 1000) + 60 * 10
        );
        
        console.log(`Victim transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log("Victim transaction confirmed.");
    }

    main().catch((error) => {
        console.error(error);
        process.exit(1);
    });
    ```
    *Note: You will need to find a token and a "whale" address holding that token on Etherscan to use in the script.*

    c. **Execute the Victim Script:** Run this in your third terminal.
    ```bash
    npx hardhat run scripts/simulateVictim.ts --network localhost
    ```

4.  **Observe the Result:**
    As soon as you run the victim script, the transaction will appear in the mempool of your local Hardhat node.

    *   **Watch your Backend terminal.** You should see your logger output: `Potential Target Found!`, followed by `Triggering sandwich attack...` and `Attack transaction sent...`.
    *   **Watch your Hardhat Node terminal.** You will see the transactions being processed.

If your backend successfully identifies the victim's transaction and calls your `Executor` contract, you have successfully completed a full, end-to-end test of your red team bot.