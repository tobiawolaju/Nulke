import { ethers } from "ethers";
import "dotenv/config";
import { router } from "../dex/router";
import { addresses } from "../config/addresses";
import { toWei } from "../utils/math";
import { logger } from "../utils/logger";

export async function buyToken(amountHuman: string, gasOptions: any) {
  logger.info("🟢 Executing BUY...");

  const amountIn = toWei(amountHuman);
  const amountOutMin = 1;

  const tx = await router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    [addresses.TOKEN_A, addresses.TOKEN_B],
    process.env.WALLET!,
    Math.floor(Date.now() / 1000) + 300,
    { ...gasOptions }
  );

  logger.info("TX Hash: " + tx.hash);
  await tx.wait();
  logger.info("✅ BUY complete");
}

export async function sellToken(amountHuman: string, gasOptions: any) {
  logger.info("🔴 Executing SELL...");

  const amountIn = toWei(amountHuman);
  const amountOutMin = 1;

  const tx = await router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    [addresses.TOKEN_B, addresses.TOKEN_A],
    process.env.WALLET!,
    Math.floor(Date.now() / 1000) + 300,
    { ...gasOptions }
  );

  logger.info("TX Hash: " + tx.hash);
  await tx.wait();
  logger.info("✅ SELL complete");
}
