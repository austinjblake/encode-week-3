import { ethers } from "hardhat";
import { Group5Token__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");
const MY_ACCOUNT = "0x1ce750e83B91D00b6cCe3ae6feBe71420feAa5FF";

async function main() {
  // Deploy contract
  const contractFactory = new Group5Token__factory();
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Token contract deployed at ${contract.address}/n`);

  console.log(`Token contract deployed at ${contract.address}`);
  // Mint some tokens
  const mintTx = await contract
    .connect(MY_ACCOUNT)
    .buyTokens({ value: MINT_VALUE.mul(2) });
  await mintTx.wait();
  console.log(
    `Minted ${MINT_VALUE.toString()} decimal units to account ${
      MY_ACCOUNT
    }`
  );
  const balanceBN = await contract.balanceOf(MY_ACCOUNT);
  console.log(
    `Account ${
      MY_ACCOUNT
    } has ${balanceBN.toString()} decimal units of MyToken`
  );
  // Check the voting power
  const votes = await contract.getVotes(MY_ACCOUNT);
  console.log(
    `Account ${
      MY_ACCOUNT
    } has ${votes.toString()} uints of voting power
    before self delegating`
  );
  // Self delgate
  const delegatTx = await contract
    .connect(MY_ACCOUNT)
    .delegate(MY_ACCOUNT);
  await delegatTx.wait();
  // Check the voting power
  const votesAfter = await contract.getVotes(MY_ACCOUNT);
  console.log(
    `Account ${
      MY_ACCOUNT
    } has ${votesAfter.toString()} uints of voting power
    after self delegating`
  );
  // Transfer tokens
  const transferTx = await contract
    .connect(MY_ACCOUNT)
    .transfer(MY_ACCOUNT, MINT_VALUE.div(2));
  await transferTx.wait();
  // Check the voting power
  const votes1AfterTransfer = await contract.getVotes(MY_ACCOUNT);
  console.log(
    `Account ${
      MY_ACCOUNT
    } has ${votes1AfterTransfer.toString()} uints of voting power
    after transferring tokens`
  );
  // Check the voting power
  const votes2AfterTransfer = await contract.getVotes("0x0896020C3cc9D01CD739adc226D8D38f4469c512");
  console.log(
    `Account ${
      MY_ACCOUNT
    } has ${votes2AfterTransfer.toString()} uints of voting power
    after transferring tokens`
  );
  // Check past voting power
  const lastBlock = await ethers.provider.getBlock("latest");
  console.log(`Current block number is ${lastBlock.number}`);
  const pastVotes = await contract.getPastVotes(
    MY_ACCOUNT,
    lastBlock.number - 1
  );
  console.log(
    `Account ${
      MY_ACCOUNT
    } had ${pastVotes.toString()} units of voting power at previous block`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
