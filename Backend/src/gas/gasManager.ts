import { ethers } from "ethers";
import "dotenv/config";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export async function getGasOptions(speed: string) {
  const baseGas = await provider.getFeeData();

  let multiplier = 1;

  if (speed === "FAST") multiplier = 3;
  if (speed === "ULTRA") multiplier = 10;

  const maxFee = (baseGas.maxFeePerGas || 1n) * BigInt(multiplier);
  const priority = (baseGas.maxPriorityFeePerGas || 1n) * BigInt(multiplier);

  return {
    maxFeePerGas: maxFee,
    maxPriorityFeePerGas: priority
  };
}
