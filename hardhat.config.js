require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/ca4a4b3ef0ed433a99b1719fee438fd5`,
      accounts: ["2ff29623a748981bfdf222d92b1c72308674ba34077a0ce447b1dd0b4d0956ed"],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};