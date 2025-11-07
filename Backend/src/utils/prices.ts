import { pair } from "../dex/pair";
import { addresses } from "../config/addresses";

export async function getPrice() {
  const [r0, r1] = await pair.getReserves();

  // TOKEN_A / TOKEN_B price
  const price = Number(r1) / Number(r0);
  return price;
}
