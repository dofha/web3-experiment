import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contract, signer } from "../config";

const NFTImage = ({ tokenId, getCount }) => {
  const contentId = "QmSogX9Pc9FjASg8eqtVQZUXqtT4M7mKhTXZ3wzuUGAYTo";
  const metadataURI = `${contentId}/${tokenId}.json`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const constructImageURI = () => {
    return `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  };

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.00005"),
    });

    await result.wait();
    await getMintedStatus();
    getCount();
  };

  const getURI = async () => {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  };

  return (
    <div>
      {isMinted && <img src={constructImageURI()}></img>}
      <h5>ID #{tokenId}</h5>
      {!isMinted ? (
        <button onClick={mintToken}>Mint</button>
      ) : (
        <button onClick={getURI}>Taken! Show URI</button>
      )}
    </div>
  );
};

export default NFTImage;
