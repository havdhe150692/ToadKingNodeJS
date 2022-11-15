
const path = require('path');
const fs = require('fs-extra');
const Web3 = require('web3');
const Web3Quorum = require('web3js-quorum');

// WARNING: the keys here are demo purposes ONLY. Please use a tool like Orchestrate or EthSigner for production, rather than hard coding private keys
const { tessera, besu } = require("../key/key.js");
const { debug, Console } = require('console');
const chainId = 1337;
const contractAddress = "0xa5ab4802f86bf9bc93081505a92c0d23345df277";
const contractJsonPath = path.resolve(__dirname, '../','bin','contracts','ToadKingToken.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractBytecode = contractJson.bytecode;
const contractAbi = contractJson.abi;
const member1Address = "f0e2db6c8dc6c681bb5d6ad121a107f300e9b2b5";
const member3Address = "0fbdc686b912d7722dc86510934589e0aaf3b55a";

//Get Token Name
async function getTokenName(clientUrl, nodeName="node", address, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
  const web3 = new Web3(clientUrl)
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "name";
  });
  const functionParams = {
    to: address,
    data: functionAbi.signature,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
  };
  console.log("-----------------------------------");
  console.log(functionParams);
  console.log("-----------------------------------");
  
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
  console.log("" + nodeName + " value from deployed contract is: " + result.output);
  return result;
};

//Get Total Supply
async function getTotalSupply(clientUrl, nodeName="node", address, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
    const web3 = new Web3(clientUrl)
    const web3quorum = new Web3Quorum(web3, chainId);
    const contract = new web3quorum.eth.Contract(contractAbi);
    // eslint-disable-next-line no-underscore-dangle
    const functionAbi = contract._jsonInterface.find(e => {
      return e.name === "totalSupply";
    });
    const functionParams = {
      to: address,
      data: functionAbi.signature,
      privateKey: fromPrivateKey,
      privateFrom: fromPublicKey,
      privateFor: [toPublicKey]
    };
    console.log("-----------------------------------");
    console.log(functionParams);
    console.log("-----------------------------------");
    
    const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);
    // console.log(`Transaction hash: ${transactionHash}`);
    const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
    console.log("" + nodeName + " value from deployed contract is: " + result.output);
    return result;
  };

async function getOwner(clientUrl, nodeName="node", address, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
    const web3 = new Web3(clientUrl)
    const web3quorum = new Web3Quorum(web3, chainId);
    const contract = new web3quorum.eth.Contract(contractAbi);
    // eslint-disable-next-line no-underscore-dangle
    const functionAbi = contract._jsonInterface.find(e => {
      return e.name === "owner";
    });
    const functionParams = {
      to: address,
      data: functionAbi.signature,
      privateKey: fromPrivateKey,
      privateFrom: fromPublicKey,
      privateFor: [toPublicKey]
    };
    console.log("-----------------------------------");
    console.log(functionParams);
    console.log("-----------------------------------");
    
    const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);
    // console.log(`Transaction hash: ${transactionHash}`);
    const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
    console.log("Owner is " + result.output);
    return result;
  };
//Get Balance Of 'account'
async function getBalanceOf(clientUrl, nodeName="node", address, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
  const web3 = new Web3(clientUrl)
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "balanceOf";
  }); 
  
  console.log("-----------------------------------");
  console.log(functionAbi.inputs);
  console.log("-----------------------------------");
  
  const addressValue = web3.utils.toChecksumAddress("f0e2db6c8dc6c681bb5d6ad121a107f300e9b2b5");
  const functionArgs = web3quorum.eth.abi
     .encodeParameters(functionAbi.inputs, [addressValue])
     .slice(2);
     
  const functionParams = {
    to: address,
    data: functionAbi.signature + functionArgs,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
  };

  console.log("-----------------------------------");
    console.log(functionParams);
  console.log("-----------------------------------");
     
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);  
  console.log(`Transaction hash: ${transactionHash}`);
    const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
    console.log("" + nodeName + " value from deployed contract is: " + result.output);
    return result;
  };
  
//Get Owner



async function transferToken(clientUrl, nodeName="node", contractAddress, contractAbi, toAddressValue, fromPrivateKey, fromPublicKey, toPublicKey){
  const web3 = new Web3(clientUrl)
  const web3quorum = new Web3Quorum(web3, chainId);
  const contract = new web3quorum.eth.Contract(contractAbi);

  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "transfer";
  });

  console.log("-----------------------------------");
  console.log(functionAbi.inputs);
  console.log("-----------------------------------");
  
  const addressValue = web3.utils.toChecksumAddress(toAddressValue);
  const functionArgs = web3quorum.eth.abi
     .encodeParameters([functionAbi.inputs[0], functionAbi.inputs[1]], 
                        [addressValue, 40000])
     .slice(2);
     
  const functionParams = {
    to: contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
  };

  console.log("-----------------------------------");
    console.log(functionParams);
  console.log("-----------------------------------");
     
  const transactionHash = await web3quorum.priv.generateAndSendRawTransaction(functionParams);  
  console.log(`Transaction hash: ${transactionHash}`);
    const result = await web3quorum.priv.waitForTransactionReceipt(transactionHash);
    console.log("" + nodeName + " value from deployed contract is: " + result.output);
    return result;
};

async function main(){

    //await getTotalSupply(besu.member1.url, "Member1", contractAddress, contractAbi, besu.member1.accountPrivateKey, tessera.member1.publicKey, tessera.member3.publicKey)
    //.catch(console.error);

  //   await getOwner(besu.member1.url, "Member1", contractAddress, contractAbi, besu.member1.accountPrivateKey, tessera.member1.publicKey, tessera.member3.publicKey)
  //  .catch(console.error);
  
  //  await getTokenName(besu.member1.url, "Member1", contractAddress, contractAbi, besu.member1.accountPrivateKey, tessera.member1.publicKey, tessera.member3.publicKey)
  //  .catch(console.error);

    await transferToken(besu.member1.url, "Member1", contractAddress, contractAbi, member3Address, besu.member1.accountPrivateKey, tessera.member1.publicKey, tessera.member3.publicKey)
    .catch(console.error);

     await getBalanceOf(besu.member1.url, "Member1", contractAddress, contractAbi, besu.member1.accountPrivateKey, tessera.member1.publicKey, tessera.member3.publicKey)
    .catch(console.error);
   //await transferToken(besu.member3.url, "Member3", contractAddress, contractAbi, member1Address, besu.member3.accountPrivateKey, tessera.member3.publicKey, tessera.member1.publicKey)
   //.catch(console.error);

  
    
  }
  
  if (require.main === module) {
    main();
  }
  
  module.exports = exports = main


  
