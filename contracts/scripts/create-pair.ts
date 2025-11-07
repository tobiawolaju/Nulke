import { ethers } from "ethers";
import "dotenv/config";

const abi = [
  "function createPair(address tokenA, address tokenB) external returns (address pair)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const factory = new ethers.Contract(process.env.FACTORY!, abi, wallet);

  const tx = await factory.createPair(process.env.TOKEN_A!, process.env.TOKEN_B!);

  console.log("✅ Pair TX Hash:", tx.hash);
}

main();
