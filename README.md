# ETHdenver Group Project #3

## Setup

create new folder "Project3"

open terminal inside "Project3"

enter these commands in your terminal. press enter after each:

- git clone https://github.com/austinjblake/encode-week-3.git
- git checkout -b _yournameorusername_
- cd encode-week-3

Send your github username in discord to be added to the repo as a collaborator so anyone on the team can push their code here

#### If using Yarn:

- yarn
- yarn hardhat compile

#### If using NPM:

- npm install --force
- npx hardhat compile

Project is now installed on your machine.

".env" file is needed. create a new one or copy one from another lesson and paste it inside the encode-week-3 folder

.env needs to have a "PRIVATE_KEY=xxxxxxxxxxxxxx" where private key is exported from your metamask

MAKE SURE THIS ACCOUNT IS ONLY FOR CODING AND HAS NO REAL MONEY IN IT!!!!!!!!!!

now that you have your private key in .env open the .gitignore file and double check .env is listed in there so your key is not added to git changes

.env can also have api keys to help prevent rate limiting. do one or all or none your script should still work

"ALCHEMY_API_KEY=xxxxxxxxxxxx" you can create an account on alchemy for free and create an api key to put here

"INFURA_API_KEY=xxxxxxxxxxxx" you can create an account on infura for free and create an api key to put here

"ETHERSCAN_API_KEY=xxxxxxxxxxxx" you can create an account on etherscan for free and create an api key to put here

#### Feel free at this point to try out "yarn hardhat test" or "npx hardhat test" to run the test suite. Not required

## Scripts

For the following command line scripts-if using Yarn, paste scripts as is. If using npm, replace "yarn run" with "npx"

### ERC20 Voting Token Deployment

this step is not needed if interacting with the token contract already on the blockchain

if you want to deploy your own, enter the command below in the terminal

- yarn run ts-node ./scripts/DeployToken.ts

after this is run the console will print out the address of the newly deployed token contract. copy and keep this for future use. you are the admin of this contract so you may mint tokens to any address you choose without paying

### Mint ERC20 Voting Tokens to an address

tokens are used to calculate voting power and accounts must have a balance of tokens before ballot snapshot to vote

if you are interacting with an existing contract, send your address in a message to get tokens minted to you

if you deployed your own contract you can use the command below to mint tokens to another address for voting

paste the command into the terminal. replace CONTRACT_ADDRESS with the address you got from the deployment step. MINT_TO_ADDRESS is the wallet address you want to mint voting tokens for. MINT_AMOUNT is the number of tokens to mint denominated in ether. Tokens are minted 1:1 with wei so a MINT_AMOUNT of 0.01 would mint 10000000000000000 tokens

- yarn run ts-node ./scripts/MintToken.ts CONTRACT_ADDRESS MINT_TO_ADDRESS MINT_AMOUNT

### Buy ERC20 Voting Tokens

tokens are used to calculate voting power and accounts must have a balance of tokens before ballot snapshot to vote

if you are not the admin of the ERC20Votes token contract and want to get tokens for voting without waiting for an admin to mint you tokens, you can run this script to call the buyTokens function. The contract will mint you tokens proportionate to the value of ether you send. 1 wei = 1 token. Anyone can call this function

paste the command into the terminal. replace CONTRACT_ADDRESS with the address you got from the deployment step. BUY_AMOUNT is the amount of ether you are sending to the contract. Tokens are minted 1:1 with wei so a BUY_AMOUNT of 0.01 would mint 10000000000000000 tokens

this mints the tokens to whoever sends the transaction so mint address is not needed

- yarn run ts-node ./scripts/BuyToken.ts CONTRACT_ADDRESS BUY_AMOUNT

### Delegate Voting power

after an account has a balance of tokens, those tokens must be delegated in order to give voting power. accounts can self delegate or delegate to another address but delegation is required or you will not be able to vote

function will delegate all of the current token amount worth of voting power. no value amount input needed

DELEGATE_TO is the address you want to receive the voting power of your tokens. enter your own address if you want to self-delegate

- yarn run ts-node ./scripts/Delegate.ts CONTRACT_ADDRESS DELEGATE_TO

### Check Voting power

after an account has a balance of tokens, those tokens must be delegated in order to give voting power. accounts can self delegate or delegate to another address but delegation is required or you will not be able to vote

function gets the voting power of an address at a certain point in time measured by block number

VOTING_ADDRESS is the address you want to check. BLOCK_NUMBER is goerli block timestamp to check power. Leave empty to check last mined block

- yarn run ts-node ./scripts/CheckVotePower.ts CONTRACT_ADDRESS VOTING_ADDRESS BLOCK_NUMBER

### Withdraw

only works for admin of token contract. transfers all eth in contract to caller. no use letting the eth sit locked in the contract forever

- yarn run ts-node ./scripts/Withdraw.ts CONTRACT_ADDRESS

### Ballot Deployment

this step is not needed if interacting with a contract already on the blockchain

if you want to deploy your own, enter the command below in the terminal and substitute the names of the proposals you want to use for PROPOSAL1, PROPOSAL 2...

TOKEN_ADDRESS is the contract address of the ERC20voting token used to vote on this ballot. TARGET_BLOCK is the block number on the goerli testnet where the voting power of accounts is snapshotted and used for this ballot

- yarn run ts-node --files ./scripts/Deployments.ts TOKEN_ADDRESS TARGET_BLOCK PROPOSAL1 PROPOSAL2 PROPOSAL3 PROPOSAL4

after this is run the console will print out the address of the newly deployed contract. copy and keep this for future use

#### Notes

The ERC20Votes contract is deployed to goerli. The address is:
0xd6CD9823d1b9a8F215Fc0230FF712CbA57c53d40

You can paste your address in the discord to request tokens to be sent to you. You can also mint your own tokens with a function that has been added by sending ether to the contract. It will mint you G5 voting tokens 1:1 with wei. Just use the BuyTokens script as shown above. This is to make it easier to interact without having to wait for the admin to mint tokens for you

The ERC20 Voting Token contract in this repo also has a withdraw function to allow the deployer/admin to pull out any eth sent to the contract from people buying tokens
