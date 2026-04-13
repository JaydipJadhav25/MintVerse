import FeatureCard from "../components/FeatureCard";
import MintVerseChatbot from "./agent/MintVerseChatbot";

const HomeV2 = () => {
  return (
    <div className="px-6 md:px-12 relative">
     
     {/* AI agent */}
     <MintVerseChatbot/>

      {/* 🔥 HERO */}
      <section className="section max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="badge mb-4 inline-block">AI Powered NFT</div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Smart NFT Minting with{" "}
          <span className="gradient-text">AI Verification</span>
        </h1>

        <p className="text-[var(--text-secondary)] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Prevent duplicate NFTs before minting. Ensure uniqueness using
          AI-powered verification and decentralized storage.
        </p>

        <div className="flex justify-center gap-4">
          <button className="btn-primary">Start Minting</button>
          <button className="btn-outline">Explore NFTs</button>
        </div>
      </section>

      {/* 🌟 FEATURES */}
      <section className="section">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="gradient-text">MintVerse</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="AI Duplicate Check"
            desc="Prevent minting duplicate NFTs using intelligent image comparison."
          />
          <FeatureCard
            title="IPFS Storage"
            desc="Secure decentralized storage powered by Pinata & IPFS."
          />
          <FeatureCard
            title="Blockchain Ownership"
            desc="True ownership using ERC721 smart contracts."
          />
        </div>
      </section>

      {/* 🔥 HOW IT WORKS */}
      <section className="section max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge mb-4 inline-block">System Flow</div>

          <h2 className="text-4xl font-bold mb-4">
            How the System <span className="gradient-text">Works</span>
          </h2>

          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            From uploading your asset to final minting, every step is secured,
            verified, and stored using decentralized technologies.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-orange-500/40 to-transparent -translate-x-1/2" />
          {/* STEP 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="text-right pr-10 premium-card">
              <div className="glass p-6 card-hover premium-card">
                <h3 className="text-lg font-semibold mb-2">Upload NFT Asset</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Users upload their digital asset along with metadata such as
                  name, description, and price. This acts as the base input for
                  the minting pipeline.
                </p>
              </div>
            </div>

         <div className="absolute left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
            </div>
          </div>

          {/* STEP 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div></div>
            <div className="pl-10 premium-card">
              <div className="glass p-6 card-hover premium-card">
                <h3 className="text-lg font-semibold mb-2">
                  AI Duplicate Detection
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Our AI engine analyzes the uploaded NFT and compares it with
                  existing assets to detect duplicates or similar patterns,
                  preventing duplicate minting.
                </p>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="text-right pr-10 premium-card">
              <div className="glass p-6 card-hover premium-card">
                <h3 className="text-lg font-semibold mb-2">Store on IPFS</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Once verified, the NFT metadata and asset are uploaded to
                  IPFS, ensuring decentralized, tamper-proof, and permanent
                  storage.
                </p>
              </div>
            </div>

           <div className="absolute left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
            </div>
          </div>

          {/* STEP 4 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div></div>

            <div className="pl-10 premium-card">
              <div className="glass p-6 card-hover premium-card">
                <h3 className="text-lg font-semibold mb-2">
                  Mint on Blockchain
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Finally, the NFT is minted using smart contracts (ERC-721),
                  recording ownership and transaction permanently on the
                  blockchain.
                </p>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeV2;
