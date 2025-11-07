import "dotenv/config";
import { getGasOptions } from "./gas/gasManager";
import { getPrice } from "./utils/prices";
import { buyToken, sellToken } from "./services/trades";
import { logger } from "./utils/logger";

const SPEED = process.env.SPEED || "FAST";
const BUY_THRESHOLD = Number(process.env.BUY_THRESHOLD || "0.02");
const SELL_THRESHOLD = Number(process.env.SELL_THRESHOLD || "0.03");
const POLL_MS = Number(process.env.POLL_MS || "5000");

async function main() {
  logger.info(`🚀 Monad Trading Bot Started — SPEED MODE: ${SPEED}`);

  let referencePrice = await getPrice();
  logger.info(`📌 Reference Price: ${referencePrice}`);

  setInterval(async () => {
    try {
      const price = await getPrice();
      const change = (price - referencePrice) / referencePrice;

      logger.info(`💹 Current: ${price} | Change: ${(change * 100).toFixed(3)}%`);

      if (change <= -BUY_THRESHOLD) {
        logger.warn("🟢 BUY signal detected!");
        const gas = await getGasOptions(SPEED);
        await buyToken("1", gas); // buy 1 TOKEN_A
        referencePrice = price;
      }

      if (change >= SELL_THRESHOLD) {
        logger.warn("🔴 SELL signal detected!");
        const gas = await getGasOptions(SPEED);
        await sellToken("1", gas);
        referencePrice = price;
      }
    } catch (err) {
      logger.error("Bot error: " + err);
    }
  }, POLL_MS);
}

main();
