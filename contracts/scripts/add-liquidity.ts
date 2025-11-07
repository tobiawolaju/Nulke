import { ethers } from "ethers";
import "dotenv/config";

const abi = [
  "function addLiquidity(address,address,uint,uint,uint,uint,address,uint) external returns (uint,uint,uint)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const router = new ethers.Contract(process.env.ROUTER!, abi, wallet);

  const tx = await router.addLiquidity(
    process.env.TOKEN_A!,
    process.env.TOKEN_B!,
    ethers.parseUnits("10000", 18),
    ethers.parseUnits("10000", 18),
    0,
    0,
    process.env.RECIPIENT!,
    Math.floor(Date.now() / 1000) + 300
  );

  console.log("✅ Added liquidity:", tx.hash);
}

main();
