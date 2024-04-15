const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const EHR = await ethers.getContractFactory("EHR");
  const ehr = await EHR.deploy();

  //await ehr.deployTransaction.wait();
  // Wait for the deployment transaction to be confirmed
  console.log("Address of the Contract", ehr.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

