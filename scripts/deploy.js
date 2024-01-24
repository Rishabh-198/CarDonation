// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const[owner, from1,from2,from3]= await hre.ethers.getSigners();
  const Donation = await hre.ethers.getContractFactory("Donation");
  const contract =await Donation.deploy(); //instance of contract
    //await contract.deploy();
    const address = await contract.getAddress();

    console.log("Address of contract", address);
    
    const addresses= [owner.address,from1.address,from2.address];
    console.log("before balance");
    await consoleBalances(addresses);

    const amount = {value:hre.ethers.parseEther("1")}
    await contract.connect(from1).receive_donation("name1", "good1",amount);
    await contract.connect(from2).receive_donation("name2", "good2",amount);
    await contract.connect(from3).receive_donation("name3", "good3",amount);

    console.log("after balance");
    await consoleBalances(addresses);

    const memo= await contract.getMemos();
    consoleMemos(memo);


}
 async function getBalances(address){
  const balanceBigInt= await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
//return balan
 }

 async function consoleBalances(addresses)
 {
  let counter =0;
  for(const address of addresses){
    console.log(`address ${counter++} balance:`, await getBalances(address)); 
  }
 }

  async function consoleMemos(memos)
 {
  for(const memo of memos)
  {
    const message= memo.message;
    const name= memo.name;
    const from= memo.from;
    const timestamp= memo.timestamp;
    console.log(`At ${timestamp}, name ${name}, with message ${message}, from ${from}`);
  }
 }


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
