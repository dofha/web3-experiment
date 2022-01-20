const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const sntGuys = await ethers.getContractFactory("SNTGuys");
    const contract = await sntGuys.deploy();
    await contract.deployed();

    const recipient = "0xfabb0ac9d68b0b445fb7357272ff202c5651694a";
    const metadataURI = "cid/test.png";

    let balance = await contract.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await contract.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.5"),
    });

    await newlyMintedToken.wait();

    balance = await contract.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await contract.isContentOwned(metadataURI)).to.equal(true);
  });
});
