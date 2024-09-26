'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Image from "next/image";
import ConnectMetamask from "./components/ConnectMetamask";
import QuoteComponent from "./components/Quote";
import CodeSnippet from "./components/CodeSnippet1";
import SearchBar from "./components/SearchBar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';



const text = "where, 1 = 0.";
const quote= "Crypto is like a salt, If the other person understands the value, You can sell it for gold.";
const author = "Xennium" ;

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/searchUser?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSearchResults(data); // Update the state with the fetched search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  const Token =`0x741869c519596eAE378CC9Cfc2D2C3aDe6980D1b`
  const dependency =`npm install @openzeppelin/contracts`

  const solidityCode = `
 //xennium.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import ERC20 and Ownable contracts from the OpenZeppelin library
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define the Xennium contract, which inherits from ERC20 and Ownable
contract Xennium is ERC20, Ownable {

    // Define a constant for the initial supply of tokens (1 million tokens with 18 decimal places)
    uint256 public constant INITIAL_COINS = 1_000_000 * 10 ** 18; 

    // Define a constant for the depreciation threshold (1 token with 18 decimal places)
    uint256 public constant DEPRECIATION_THRESHOLD = 1 * 10 ** 18; 

    // Mapping to track the amount of coins spent by each user
    mapping(address => uint256) public spentCoins;

    // Mapping to track the last time coins were spent by each user
    mapping(address => uint256) public lastSpentTime;

    // Mapping to track the true value of coins for each user
    mapping(address => uint256) public trueValue;

    // Constructor function that initializes the contract
    constructor(address owner) ERC20("Xennium", "XENX") Ownable(owner) {
        // Mint the initial supply of tokens to the specified owner
        _mint(owner, INITIAL_COINS);
        // Set the initial true value of the owner's coins to 100%
        trueValue[owner] = 100; 
    }

    // Function to allow users to spend their coins
    function spendCoins(uint256 amount) external {
        // Ensure the user has more than the depreciation threshold before spending
        require(balanceOf(msg.sender) > DEPRECIATION_THRESHOLD, "Cannot spend the last Xennium coin");
        // Ensure the user has enough coins to spend
        require(balanceOf(msg.sender) >= amount, "Not enough coins");

        // Calculate the remaining coins after spending the specified amount
        uint256 remainingCoins = balanceOf(msg.sender) - amount;
        // Calculate the depreciation value based on the remaining coins
        uint256 depreciation = calculateDepreciation(msg.sender, remainingCoins);
        // Ensure depreciation is less than 100% before allowing the spend
        require(depreciation < 100, "Cannot spend the last Xennium coin");

        // Burn the specified amount of coins from the user's balance
        _burn(msg.sender, amount);
        // Track the amount of coins spent by the user
        spentCoins[msg.sender] += amount;
        // Update the last time coins were spent by the user
        lastSpentTime[msg.sender] = block.timestamp;

        // Update the true value of the user's coins after spending
        trueValue[msg.sender] = depreciation; 
    }

    // Function to calculate the depreciation of the user's coins
    function calculateDepreciation(address account, uint256 remainingCoins) public view returns (uint256) {
        // If the remaining coins are less than or equal to the depreciation threshold, return 100% depreciation
        if (remainingCoins <= DEPRECIATION_THRESHOLD) {
            return 100; 
        } else {
            // Calculate the percentage of coins spent relative to the total coins (spent + remaining)
            uint256 spentPercentage = (spentCoins[account] * 100) / (spentCoins[account] + remainingCoins);
            uint256 depreciation = spentPercentage;
            // Retrieve the current true value of the user's coins
            uint256 currentTrueValue = trueValue[account];
            // Return the updated true value after applying the depreciation
            return currentTrueValue >= depreciation ? currentTrueValue - depreciation : 0;
        }
    }

    // Function to allow users to receive coins
    function receiveCoins(uint256 amount) external {
        // Ensure the amount to receive is greater than zero
        require(amount > 0, "Amount must be greater than zero");
        // Mint the specified amount of tokens to the user's balance
        _mint(msg.sender, amount);
        // Reset the depreciation for the user after receiving new coins
        resetDepreciation(msg.sender, amount);
    }

    // Function to reset the depreciation value when the user receives new coins
    function resetDepreciation(address account, uint256 amount) public {
        // Calculate the new total balance after receiving the coins
        uint256 newTotal = balanceOf(account) + amount; 
        // Calculate the new percentage of coins spent relative to the total balance
        uint256 newSpentPercentage = (spentCoins[account] * 100) / newTotal;
        // Set the true value of the user's coins to 100% minus the new spent percentage
        trueValue[account] = 100 - newSpentPercentage;
    }

    // Override the transfer function to add a restriction based on the depreciation threshold
    function transfer(address to, uint256 amount) public override returns (bool) {
        // Ensure the user does not transfer coins if it would leave them below the depreciation threshold
        if (balanceOf(msg.sender) - amount < DEPRECIATION_THRESHOLD) {
            revert("Cannot transfer last Xennium coin");
        }
        // Call the original transfer function from the ERC20 contract
        return super.transfer(to, amount);
    }
}
  `;

  const deploy=`
//deploy.js
const hre = require("hardhat"); // Import the Hardhat Runtime Environment (hre) module

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // Get the first signer (deployer) from the list of available signers

  const balance = await deployer.getBalance(); // Fetch the balance of the deployer
  console.log("Deployer address:", deployer.address); // Print the deployer's address
  console.log("Deployer balance:", hre.ethers.utils.formatEther(balance), "ETH"); // Print the deployer's balance in ETH

  if (balance.eq(0)) {
    console.error("Error: Deployer account has 0 ETH. Please add funds and try again."); // Error message if deployer has 0 ETH
    return; // Exit the function if there's no balance
  }

  const gasPrice = await hre.ethers.provider.getGasPrice(); // Fetch the current gas price from the provider
  console.log("Current gas price:", hre.ethers.utils.formatUnits(gasPrice, "gwei"), "gwei"); // Print the current gas price in gwei

  // Deploy Xennium contract
  const Xennium = await hre.ethers.getContractFactory("Xennium"); // Get the contract factory for the Xennium contract
  const xennium = await Xennium.deploy(deployer.address); // Deploy the Xennium contract, passing the deployer's address as an argument

  await xennium.deployed(); // Wait for the contract deployment to complete

  console.log("Xennium deployed to:", xennium.address); // Print the address where the Xennium contract is deployed
}

main()
  .then(() => process.exit(0)) // Exit the process successfully if the main function resolves
  .catch((error) => {
    console.error(error); // Print any errors that occur during execution
    process.exit(1); // Exit the process with a failure code
  });

`
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="flex mt-3 ml-auto">
            <SearchBar onSearch={handleSearch} /> 
            {/* Display search results */}
            {searchResults.length > 0 && (
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            )}
          </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-container">
            <div className="loading-animation text-xl font-bold">X</div>
            <div className="rotating-circle size-1"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <Image
              className="relative z-10 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert fade-in"
              src="/xennium.png"
              alt="Xennium"
              width={180}
              height={180}
              priority
            />

            <p className="absolute top-[70%] left-1/2 transform -translate-x-1/2 text-sm opacity-50 z-20 fade-in-text">
              {text.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-5 text-center lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-center">
            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 border-black ">
              <h2 className="mb-3 text-2xl font-semibold">
                Connect{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <ConnectMetamask />
            </div>
            <a
              href="/faucet"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 border-black "
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-2xl font-semibold text-center">
                Faucet{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50 text-right ">
                Interact with xennium faucet.
              </p>
            </a>
          </div>
          <div className="text-center pt-5">
            <a
              href={session ? "/about" : "/register"}
              className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:translate-y-0.5 transition-transform"
            >
              {session ? "Learn More" : "Get Started"} <i className="bi bi-arrow-right"></i>
            </a>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-12">
            <CodeSnippet 
              code={Token} 
              language="Xennium Token Address" 
            />
          </div>
          <div className="w-full max-w-4xl mx-auto mt-12">
            <CodeSnippet 
              code={dependency} 
              language="Dependency" 
            />
          </div>
          <div className="w-full max-w-4xl mx-auto mt-12">
            <CodeSnippet 
              code={solidityCode} 
              language="solidity" 
            />
          </div>
          <div className="w-full max-w-4xl mx-auto mt-12">
            <CodeSnippet 
              code={deploy} 
              language="javascript" 
            />
          </div>
          <div className='pt-3'>
      <QuoteComponent quote={quote} author={author} />
    </div>

    <div>
      <ScrollToTopButton/>
    </div>



          {/* Links Section at the Bottom */}
          <div className="mt-12 text-center text-sm opacity-50">
            <a href="/contact" className="mx-4 hover:underline">Contact Us</a>
            <a href="/support" className="mx-4 hover:underline">Support Us</a>
            <a href="/privacy-policy" className="mx-4 hover:underline">Privacy Policy</a>
            <a href="/terms-and-conditions" className="mx-4 hover:underline">Terms and Conditions</a>
          </div>
        </>
      )}
    </main>
  );
}
