//import
const {ethers, run, network} = require("hardhat");

//async main
async function main() {

  //deploys the contract 
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract. . .")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`deployed contract to ${simpleStorage.address}`)
  
  //checks if the network is a test net
  //if it is, it verifies it
  if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, [])
  }

  //interacts with the contract
  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is ${currentValue}`)


  const transcationResponse = await simpleStorage.store(7)
  await transcationResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is ${updatedValue}`)
}


async function verify(contractAddress, args) {
  console.log("verifying contract")
  try{
    //runs a hardhat task
    await run("verify:verify", {
      //needs the contract address
      address: contractAddress,
      //additional arguments
      constructorArguments: args,
    })
  } catch(e) {
    //catches to see if the contract is already verified and if so then skip
    if(e.message.toLowerCase().includes("already verified")){
      console.log("already verified")
    } else {
      console.log(e)
    }
  }
  
}

// main

main()
.then(() => {
  process.exit(0)
})
.catch((error) => {
  console.log(error);
  process.exit(1);
})