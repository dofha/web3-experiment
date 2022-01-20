import { ethers } from "ethers";
import { useState } from "react";

const WalletBalance = () => {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div>
      <h5>Your Balance: {balance}</h5>
      <button onClick={() => getBalance()} className="btn btn-primary">Show my balance</button>
    </div>
  );
};

export default WalletBalance;
