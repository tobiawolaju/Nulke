export function toWei(amount: string, decimals = 18) {
  return BigInt(Math.floor(Number(amount) * 10 ** decimals));
}
