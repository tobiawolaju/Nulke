import { ethers } from "ethers";
import "dotenv/config";
import { pairAbi } from "./pairAbi";
import { addresses } from "../config/addresses";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export const pair = new ethers.Contract(
  addresses.PAIR,
  pairAbi,
  provider
);
