const {ethers} = require("hardhat");
const {expect, assert} = require("chai");

describe("SimpleStorage", () => {

  let simpleStorageFactory;
  let simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

    simpleStorage = await simpleStorageFactory.deploy();
  })



  it("Should start with a favorite number of 0.", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = 0;

    //assert
    //expect

    assert.equal(currentValue.toString(), expectedValue)
  })


  it("It should update when we call store" , async () => {
    const expectedValue = "7";
    const transcationResponse = await simpleStorage.store(expectedValue);
    await transcationResponse.wait(1)

    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue)
  })
})