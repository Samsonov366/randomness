const { expect } = require("chai");
const hre = require("hardhat");

describe("Attack", () => {
  it("Should be able to guess the exact number", async () => {
    // Deploy the game Contract
    const gameContract = await hre.ethers.deployContract("Game", [],{
        value: hre.ethers.parseEther("0.1"),
      });
    await gameContract.waitForDeployment();

    // Deploy the attack Contract
    const attackContract = await hre.ethers.deployContract("Attack", [
      gameContract.target,
    ]);
    await attackContract.waitForDeployment();

    const attackTxn = await attackContract.attack();

    await attackTxn.wait();

    expect(await gameContract.getBalance()).to.equal(BigInt("0"));

  });
});