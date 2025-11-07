import { ethers } from "ethers";
import "dotenv/config";
import { routerAbi } from "./routerAbi";
import { addresses } from "../config/addresses";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export const router = new ethers.Contract(
  addresses.ROUTER,
  routerAbi,
  wallet
);
