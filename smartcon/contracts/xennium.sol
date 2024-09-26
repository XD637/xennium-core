// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Xennium is ERC20, Ownable {
    uint256 public constant INITIAL_COINS = 1_000_000 * 10 ** 18; // Increased supply to 1 million tokens
    uint256 public constant DEPRECIATION_THRESHOLD = 1 * 10 ** 18; // Threshold to prevent spending the last coin

    mapping(address => uint256) public spentCoins; // Tracks the amount of coins spent by each user
    mapping(address => uint256) public lastSpentTime; // Tracks the last time coins were spent by each user
    mapping(address => uint256) public trueValue; // Tracks the true value of coins for each user

    constructor(address owner) ERC20("Xennium", "XENX") Ownable(owner) {
        _mint(owner, INITIAL_COINS);
        trueValue[owner] = 100; // Initial true value is 100% for the owner
    }

    function spendCoins(uint256 amount) external {
        require(balanceOf(msg.sender) > DEPRECIATION_THRESHOLD, "Cannot spend the last Xennium coin");
        require(balanceOf(msg.sender) >= amount, "Not enough coins");

        uint256 remainingCoins = balanceOf(msg.sender) - amount;
        uint256 depreciation = calculateDepreciation(msg.sender, remainingCoins);
        require(depreciation < 100, "Cannot spend the last Xennium coin");

        _burn(msg.sender, amount);
        spentCoins[msg.sender] += amount;
        lastSpentTime[msg.sender] = block.timestamp;

        trueValue[msg.sender] = depreciation; // Update true value after spending
    }

    function calculateDepreciation(address account, uint256 remainingCoins) public view returns (uint256) {
        if (remainingCoins <= DEPRECIATION_THRESHOLD) {
            return 100; // Depreciation is 100% if only the last coin is remaining
        } else {
            uint256 spentPercentage = (spentCoins[account] * 100) / (spentCoins[account] + remainingCoins);
            uint256 depreciation = spentPercentage;
            uint256 currentTrueValue = trueValue[account];
            return currentTrueValue >= depreciation ? currentTrueValue - depreciation : 0;
        }
    }

    function receiveCoins(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        _mint(msg.sender, amount);
        resetDepreciation(msg.sender, amount);
    }

    function resetDepreciation(address account, uint256 amount) public {
        uint256 newTotal = balanceOf(account) + amount; // Account for the newly received coins
        uint256 newSpentPercentage = (spentCoins[account] * 100) / newTotal;
        trueValue[account] = 100 - newSpentPercentage;
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        if (balanceOf(msg.sender) - amount < DEPRECIATION_THRESHOLD) {
            revert("Cannot transfer last Xennium coin");
        }
        return super.transfer(to, amount);
    }
}
