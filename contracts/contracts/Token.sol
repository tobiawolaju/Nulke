// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 supply, address recipient)
        ERC20("TradingBotToken", "TBT")
    {
        _mint(recipient, supply);
    }
}
