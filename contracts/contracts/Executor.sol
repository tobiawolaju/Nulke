// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Executor {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function execute(address target, bytes calldata data)
        external
        payable
        returns (bytes memory)
    {
        require(msg.sender == owner, "Not owner");

        (bool success, bytes memory result) =
            target.call{value: msg.value}(data);

        require(success, "Call failed");

        return result;
    }
}
