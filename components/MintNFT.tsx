"use client";

import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../abi/MyNFT.json";

const CONTRACT_ADDRESS =
  "0x83117a4473195c54392B16C876802e4f22D5C3C3";

export default function MintNFT() {
  const [wallet, setWallet] = useState("");

  async function connectWallet() {
    try {
      if (!(window as any).ethereum) {
        alert("Wallet non détecté");
        return;
      }

      const provider = new BrowserProvider(
        (window as any).ethereum
      );

      await provider.send(
        "eth_requestAccounts",
        []
      );

      const signer =
        await provider.getSigner();

      const address =
        await signer.getAddress();

      setWallet(address);
    } catch (err) {
      console.error(err);
    }
  }

  async function mintNFT() {
    try {
      const provider = new BrowserProvider(
        (window as any).ethereum
      );

      const signer =
        await provider.getSigner();

      const contract = new Contract(
        CONTRACT_ADDRESS,
        abi,
        signer
      );

      const metadata =
        "ipfs://YOUR_METADATA_URI";

      const tx =
        await contract.mint(metadata);

      await tx.wait();

      alert("NFT Minted !");
    } catch (err) {
      console.error(err);
      alert("Mint Error");
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>
        Connect Wallet
      </button>

      <br />
      <br />

      <p>{wallet}</p>

      <button onClick={mintNFT}>
        Mint NFT
      </button>
    </div>
  );
}
