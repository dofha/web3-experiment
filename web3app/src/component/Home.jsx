import { useEffect, useState } from "react";
import { contract } from "../config";
import NFTImage from "./NFTImage";
import WalletBalance from "./WalletBalance";

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />
      <h1>Collection</h1>
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage tokenId={i} getCount={getCount} />
          </div>
        ))}
    </div>
  );
};

export default Home;
