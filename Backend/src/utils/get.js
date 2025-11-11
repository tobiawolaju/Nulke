import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";

const RPC = process.env.RPC_URL; // should now be set!
const provider = new ethers.JsonRpcProvider(RPC);
const address = "0x7bDA9B183151fA31d8048BE0e8204275e786776F";

async function main(){
 const code = await provider.getCode(address);
    console.log("Bytecode length:", code.length);
  console.log(code); // hex of deployed bytecode
  console.log(RPC)
}

main().catch(console.error);
