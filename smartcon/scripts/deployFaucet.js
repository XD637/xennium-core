const hre = require("hardhat");

async function main() {
  // Get the deployer's account information
  const [deployer] = await hre.ethers.getSigners();

  // Check the deployer's balance
  const balance = await deployer.getBalance();
  console.log("Deployer address:", deployer.address);
  console.log("Deployer balance:", hre.ethers.utils.formatEther(balance), "ETH");

  // Ensure the deployer has sufficient funds
  if (balance.eq(0)) {
    console.error("Error: Deployer account has 0 ETH. Please add funds and try again.");
    return;
  }

  // Get the current gas price
  const gasPrice = await hre.ethers.provider.getGasPrice();
  console.log("Current gas price:", hre.ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");

  // Deploy the Xennium contract, passing the deployer address as the owner
  const Xennium = await hre.ethers.getContractFactory("Xennium");
  const xennium = await Xennium.deploy(deployer.address); 
  await xennium.deployed();
  console.log("Xennium deployed to:", xennium.address);

  // Deploy the Xennium Faucet contract, passing the Xennium contract address and the deployer address
  const XenniumFaucet = await hre.ethers.getContractFactory("XenniumFaucet");
  const faucet = await XenniumFaucet.deploy(xennium.address, deployer.address); 
  await faucet.deployed();
  console.log("Xennium Faucet deployed to:", faucet.address);

  // Fund the faucet with an initial amount of tokens
  const initialFaucetFunding = hre.ethers.utils.parseEther("100000"); 
  await xennium.transfer(faucet.address, initialFaucetFunding);
  console.log(`Faucet funded with ${hre.ethers.utils.formatEther(initialFaucetFunding)} XENX`);
}

// Execute the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
