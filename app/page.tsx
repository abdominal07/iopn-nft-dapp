import MintNFT from "../components/MintNFT";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
        textAlign: "center"
      }}
    >
      <h1>IOPN Genesis NFT</h1>

      <p>
        Mint your NFT on OPN Chain
      </p>

      <MintNFT />
    </main>
  );
}
