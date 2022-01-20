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
    <>
      {isMinted && (
        <div className="card">
          <h5 className="card-header">ID #{tokenId}</h5>
          <div className="card-body">
            <img src={constructImageURI()} width={200}></img>
            <div>
              <button onClick={getURI} className="btn btn-primary">
                Show URI
              </button>
            </div>
          </div>
        </div>
      )}
      {!isMinted && (
        <div className="card">
          <h5 className="card-header">ID #{tokenId}</h5>
          <div className="card-body">
            <img
              src="https://www.publicdomainpictures.net/pictures/280000/velka/question-mark-1544553868vD2.jpg"
              width={200}
            ></img>
            <div>
              <button onClick={mintToken} className="btn btn-primary">
                Mint
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NFTImage;
