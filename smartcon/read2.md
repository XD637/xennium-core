# Xennium Smart Contract

## Overview

The Xennium smart contract is an ERC-20 token contract designed with a unique depreciation mechanism. This mechanism ensures that tokens lose value as they are spent. The contract also provides functionality for minting new tokens and managing depreciation resets when tokens are received.

## Contract Features

- **ERC-20 Token**: Conforms to the ERC-20 standard for fungible tokens, ensuring compatibility with various wallets and exchanges.
- **Depreciation Mechanism**: Tokens lose value based on the total amount spent by the user. This feature is intended to reflect the reduced utility of tokens as they are used.
- **Token Minting and Spending**: Allows minting of new tokens and spending of existing ones, while taking depreciation into account.
- **Threshold Protection**: Prevents spending of the last Xennium coin to ensure that a minimum balance is maintained.

## Contract Functions

### `constructor(address owner)`

- **Description**: Initializes the contract, mints the initial supply of tokens to the specified owner, and sets the initial true value of tokens for the owner.

### `spendCoins(uint256 amount)`

- **Description**: Allows users to spend a specified amount of tokens, applying depreciation logic to ensure tokens are not used up completely.

### `calculateDepreciation(address account, uint256 remainingCoins)`

- **Description**: Calculates the depreciation of tokens based on the user's spending history and remaining balance.

### `receiveCoins(uint256 amount)`

- **Description**: Mints new tokens for the caller and resets the depreciation based on the newly received tokens.

### `resetDepreciation(address account, uint256 amount)`

- **Description**: Resets the depreciation of tokens when new tokens are received, ensuring that the true value of tokens reflects recent transactions.

### `transfer(address to, uint256 amount)`

- **Description**: Transfers tokens to another address, with a check to prevent the sender from spending their last Xennium coin.

## Installation and Usage

1. **Install Dependencies**:
   - Ensure you have the necessary OpenZeppelin contracts installed.

2. **Deploy Contract**:
   - Deploy the Xennium contract to the Ethereum network.

3. **Interact with Contract**:
   - Use a Web3 provider to interact with the deployed contract, including minting, spending, and transferring tokens.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
