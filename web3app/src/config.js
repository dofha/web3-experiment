import SNTGuys from "./artifacts/contracts/MyNFT.sol/SNTGuys.json";
import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
export const signer = provider.getSigner();

// get the smart contract
export const contract = new ethers.Contract(
  contractAddress,
  SNTGuys.abi,
  signer
);
