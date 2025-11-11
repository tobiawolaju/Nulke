# ✅ **Monad Trading Bot — Full Project Documentation**

Developed by **Nulke Quant Systems**, a meme-coin focused HFT/quant startup on Monad.

A complete **smart-contract + backend trading bot system** built for **Monad Testnet**, using:

* **Hardhat 3** (Ignition deployment)
* **Solidity 0.8.28**
* **Ethers.js v6** for interactions
* **Node.js backend** trading bot
* **Modular structure for scaling**

This setup gives you a clean environment to:

✅ Deploy smart contracts
✅ Add liquidity / create pairs
✅ Run trading bots
✅ Execute custom contract calls
✅ Extend into a full DEX or custom trading engine

---

# ✅ **📁 Project Structure**

```
MonadTradingBot/
│
├── Contract/                   # Smart contracts + Hardhat 3
│   │   hardhat.config.ts
│   │   package.json
│   │   tsconfig.json
│   │   .env
│   │
│   ├── contracts/
│   │     Token.sol
│   │     Executor.sol
│   │
│   ├── ignition/
│   │     modules/
│   │         TokenModule.ts
│   │         ExecutorModule.ts
│   │
│   ├── scripts/
│   │     add-liquidity.ts
│   │     create-pair.ts
│   │
│   └── test/
│         token.test.ts
│
├── Backend/                    # Trading bot backend (Node.js)
│   │   package.json
│   │   .env
│   │   index.js
│   │
│   ├── services/
│   │     provider.js
│   │     wallet.js
│   │     executor.js
│   │     trade.js
│   │
│   └── utils/
│         logger.js
│
└── Frontend/                   # Optional UI dashboard
    │   index.html
    │   style.css
    │   app.js
```

---

# ✅ **🚀 Features**

### ✅ Smart Contracts

* **Token.sol** – ERC20 token using OpenZeppelin
* **Executor.sol** – Executes arbitrary contract calls (for trading bot)

### ✅ Hardhat 3 (Ignition)

* Official deployment system
* Saves previous deployments
* Auto-resume on failure
* Parallel transaction sending

### ✅ Backend Trading Bot

* Fully in Node.js + Ethers.js v6
* Reads chain state
* Executes swaps through Executor
* Monitors mempool (extendable)
* Add your own trading logic

### ✅ Ethers.js Interaction Scripts

* `create-pair.ts` – Create a pool/pair
* `add-liquidity.ts` – Provide liquidity

---

# ✅ **🔧 Setup Instructions**

## 1️⃣ Prerequisites

Install:

* Node.js v22+
* npm
* Git

---

# ✅ **📦 Contract Setup**

```
cd MonadTradingBot/Contract
npm install
npm install @openzeppelin/contracts
```

✅ OpenZeppelin must be installed for ERC20.

---

## ✅ **Configure .env**

Create `Contract/.env`:

```
RPC_URL=https://testnet-rpc.monad.xyz
PRIVATE_KEY=your_private_key
RECIPIENT=0xYourAddress
ROUTER=0xRouterAddressIfUsingDEX
TOKEN_A=0xTokenA
TOKEN_B=0xTokenB
FACTORY=0xFactoryAddress
```

---

# ✅ **🛠 Build Contracts**

```
npx hardhat build
```

---

# ✅ **📤 Deploy Smart Contracts (Ignition)**

## ✅ Deploy Token

```
npx hardhat ignition deploy ignition/modules/TokenModule.ts --network monad
```

## ✅ Deploy Executor

```
npx hardhat ignition deploy ignition/modules/ExecutorModule.ts --network monad
```

---

# ✅ **💧 Create Pair**

```
npx ts-node scripts/create-pair.ts
```

---

# ✅ **💧 Add Liquidity**

```
npx ts-node scripts/add-liquidity.ts
```

---

# ✅ **🤖 Backend Trading Bot Setup**

```
cd ../Backend
npm install
```

Configure backend `.env`:

```
RPC_URL=https://testnet-rpc.monad.xyz
PRIVATE_KEY=your_private_key
EXECUTOR=0xDeployedExecutorAddress
TOKEN=0xDeployedTokenAddress
```

---

# ✅ **▶ Run the Bot**

```
node index.js
```

You should see:

```
✅ Monad Trading Bot Started...
🔍 Checking for opportunities...
✅ Trade executed: 0x...
```

---

# ✅ **📈 Optional Frontend Dashboard**

```
✅ 📈 Frontend Dashboard (Vite + React)

The frontend is powered by Vite + React for a fast development experience and modern UI.
It provides a dashboard for monitoring:

✅ Bot status
✅ Wallet balance
✅ Recent trades
✅ Liquidity info
✅ Token interactions

✅ 📁 Frontend Structure
Frontend/                    # Vite + React dashboard
│   package.json
│   vite.config.js
│   index.html
│
├── src/
│   │   main.jsx
│   │   App.jsx
│   │
│   ├── components/
│   │       Header.jsx
│   │       StatusCard.jsx
│   │       WalletInfo.jsx
│   │       TradesTable.jsx
│   │
│   └── assets/
│
└── public/

✅ Install Frontend Dependencies
cd MonadTradingBot/Frontend
npm install

✅ Start Development Server
npm run dev


You should see something like:

VITE v5.x  ready in 200ms
Local:   http://localhost:5173/

```
