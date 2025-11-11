const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.WebSocketProvider(process.env.MAINNET_WSS_URL);

provider.on("open", () => {
    console.log("WebSocket Provider connected.");
});

provider.on("close", (code, reason) => {
    console.error(`WebSocket closed: ${code} - ${reason}`);
    // Implement reconnection logic if needed
});

module.exports = provider;