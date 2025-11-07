export const logger = {
  info: (msg: string) => console.log("\x1b[36m%s\x1b[0m", msg),
  warn: (msg: string) => console.log("\x1b[33m%s\x1b[0m", msg),
  error: (msg: string) => console.log("\x1b[31m%s\x1b[0m", msg)
};
