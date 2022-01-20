import SNTGuys from "./artifacts/contracts/MyNFT.sol/SNTGuys.json";
import { ethers } from "ethers";

const contractAddress = "0x925a945e2224e00261ccf6aa3396f07bac8c6f01";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
export const signer = provider.getSigner();

// get the smart contract
export const contract = new ethers.Contract(
  contractAddress,
  SNTGuys.abi,
  signer
);
