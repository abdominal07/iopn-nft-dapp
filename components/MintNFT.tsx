"use client";

import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../abi/MyNFT.json";

// Déclaration pour éviter l'erreur TypeScript sur window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = "0x83117a4473195c54392B16C876802e4f22D5C3C3";

export default function MintNFT() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("");

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Wallet non détecté. Installe MetaMask !");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
      setStatus("Wallet connecté !");
    } catch (err) {
      console.error(err);
      setStatus("Erreur de connexion");
    }
  }

  async function mintNFT() {
    try {
      if (!window.ethereum) {
        alert("Wallet non détecté");
        return;
      }

      setStatus("Confirmation du Mint en cours...");

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

      const metadata = "ipfs://YOUR_METADATA_URI"; // REMPLACE ÇA AVEC TON VRAI LIEN IPFS

      const tx = await contract.mint(metadata);
      setStatus("Transaction en cours de validation...");

      await tx.wait();
      setStatus("NFT Minted avec succès ! 🎉");
    } catch (err: any) {
      console.error(err);
      setStatus("Erreur de Mint: " + (err.reason || "Transaction annulée"));
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2>IOPN NFT Minter</h2>
      
      {!wallet ? (
        <button 
          onClick={connectWallet}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connecté : {wallet.substring(0, 6)}...{wallet.substring(38)}</p>
          <button 
            onClick={mintNFT}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white" }}
          >
            Mint NFT
          </button>
        </>
      )}

      {status && <p style={{ marginTop: "20px", color: "blue" }}>{status}</p>}
    </div>
  );
}
