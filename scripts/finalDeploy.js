
const hre = require("hardhat");

async function main() {

  const Dapp = await hre.ethers.getContractFactory("Donation");
  const contract =await Dapp.deploy(); //instance of contract
    //await contract.deploy();
    const address = await contract.getAddress();

    console.log("Address of contraqct", address);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  