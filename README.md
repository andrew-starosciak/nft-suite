# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

# Debugging

Start up the localhost network:

```
npx hardhat node
```

Run the scripts on the localhost:

```
npx hardhat run scripts/deploy.ts --network localhost
```

Use the local ethereum hash as the contract address the script is deployed to.
We can use the console to debug and interact with the smart contract.

```
npx hardhat console --network localhost
```

Useful Links associated with coding on the blockchain.

- [Hardhat Getting Started](https://hardhat.org/getting-started/)
- [Alchemy Dashboard](https://dashboard.alchemyapi.io/) - Api for running dApp
- [Etherscan API Key](https://etherscan.io/myapikey)
- [ERC721 Contract Example](https://docs.openzeppelin.com/contracts/4.x/erc721) - OpenZeppelin Implementation
- [2manslkh/nft-suite](https://github.com/2manslkh/nft-suite)
- [Cryptozombies Course](https://cryptozombies.io/en/course/)
- [Calling the Smart Contract Example Documentation](https://docs.openzeppelin.com/learn/deploying-and-interacting#calling-the-contract)
- [Interacting from the Console Documentation](https://docs.openzeppelin.com/learn/deploying-and-interacting#interacting-from-the-console)
