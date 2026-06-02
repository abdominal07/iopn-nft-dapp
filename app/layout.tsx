export const metadata = {
  title: "IOPN NFT DApp",
  description: "NFT minting on IOPN Chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
