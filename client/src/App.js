import React, { useEffect, useState } from 'react';
import CopyrightArtifact from "../src/artifacts/contracts/EHR.sol/EHR.json";
import { ethers } from "ethers";
 //import Admin from './components/Admin';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const contractAddress = "0x1ae9b27362f20980B7a21E548184820b71c15B9d";
          const contract = new ethers.Contract(
            contractAddress,
            CopyrightArtifact.abi,
            signer
          );

          console.log(contract);
          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error loading provider:", error);
        }
      } else {
        console.log("Metamask not detected");
      }
    };

    loadProvider();
  }, []);

  return (
    <div className="App">
      <h1>Blockchain EHR</h1>
      <p>Account: {account ? account : "Connect with Metamask"}</p>
     
    </div>
  );
}

export default App;
