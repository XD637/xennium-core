# Xennium Algorithm

## Overview

The Xennium Algorithm demonstrates a unique approach to token depreciation based on the amount spent. It models how the true value of a token decreases as it is used, with a special rule that prevents the last remaining token from being spent once its true value reaches zero.

## Key Concepts

- **Initial Value (IV)**: This represents the starting number of Xennium coins.
- **True Value (TV)**: This is the percentage of value remaining for each token, starting at 100% for new tokens.
- **Spend Value (SV)**: This is the amount of Xennium coins spent in each transaction.

## Depreciation Mechanism

1. **Spending Tokens**: The user specifies how many Xennium coins they wish to spend.
2. **Value Calculation**:
   - The percentage of tokens spent relative to the remaining tokens is computed.
   - The true value of the remaining tokens is reduced based on this percentage.
3. **End Condition**: The simulation continues until only one token remains. At this point, its true value drops to 0%, rendering it effectively worthless and preventing further spending.

### Example Scenario

Consider starting with 10 Xennium coins:

1. **Initial Setup**: You have 10 Xennium coins, each with a true value of 100%.
2. **Spending Tokens**: As you spend tokens, the remaining coins' true value decreases.
   - For instance, spending a portion of your tokens decreases their value based on the percentage spent.
3. **Final State**: When the total spent tokens reach 9, the last remaining token's true value becomes 0%, meaning it cannot be spent.

## Simulation

The algorithm continuously updates and tracks the true value of the tokens as spending occurs. It provides a visual representation of how the true value depreciates over time, demonstrating the impact of token usage.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to modify or expand this explanation as needed!
