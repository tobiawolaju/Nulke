const { ethers } = require("ethers");
const provider = require("./provider");
require("dotenv").config();

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

module.exports = wallet;