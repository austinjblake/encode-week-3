import { Group5Token__factory } from "./../typechain-types/factories/contracts/ERC20Votes.sol/Group5Token__factory";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const address = "0x9Ff726DF93C8773F9E88410CAD6c69E8c91690EF";
const amount = ".001";

async function deploy() {
  // use ethers to connect to goerli and wallet to create a signer
  const provider = ethers.getDefaultProvider("goerli", {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: process.env.INFURA_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  }) as any;
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "") as any;
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  console.log(
    `Working on Goerli Testnet connected to wallet ${signer.address} with balance of ${balance}`
  );
  // connect to token contract onchain with signer and contract address passed in from cli argument
  const tokenFactory = new Group5Token__factory(signer);
  const tokenContract = await tokenFactory.attach(address);
  const initTokens = await tokenContract.balanceOf(signer.address);
  console.log(
    `Account ${signer.address} currently has ${initTokens} G5 tokens`
  );
  console.log("Buying ERC20voting token...");
  // buy erc20 voting tokens with amount of ether from cli argument
  const buyTx = await tokenContract.buyTokens({
    value: ethers.utils.parseEther(amount ?? "0"),
  });
  await buyTx.wait();
  const tokenBalance = await tokenContract.balanceOf(signer.address);
  console.log(`Account ${signer.address} now has ${tokenBalance} G5 tokens`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
