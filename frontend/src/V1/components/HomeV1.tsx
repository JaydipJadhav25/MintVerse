import FeatureCard from "../components/FeatureCard";

const HomeV1 = () => {
  return (
    <div className="px-6 md:px-12">

      {/* 🚀 HERO SECTION */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Create & Explore NFTs in{" "}
          <span className="gradient-text">MintVerse</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-8">
          A decentralized platform to mint, showcase, and discover unique digital assets powered by blockchain & IPFS.
        </p>

        <div className="flex justify-center gap-4">
          <button className="btn-primary"> Start Minting</button>
          <button className="glass px-6 py-2 rounded-xl text-gray-300 hover:text-white">
             Explore NFTs
          </button>
        </div>
      </section>

      {/* 🌟 FEATURES */}
      <section className="section">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="gradient-text">MintVerse</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Easy Minting"
            desc="Upload your digital assets and mint NFTs in just a few clicks."
          />
          <FeatureCard
            title="Decentralized Storage"
            desc="All assets are stored securely on IPFS via Pinata."
          />
          <FeatureCard
            title="Secure Ownership"
            desc="True ownership powered by Ethereum blockchain and ERC721."
          />
        </div>
      </section>

      {/* 📊 STATS / TRUST */}
      <section className="section">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="glass p-6">
            <h3 className="text-3xl font-bold gradient-text">10K+</h3>
            <p className="text-gray-400">NFTs Minted</p>
          </div>

          <div className="glass p-6">
            <h3 className="text-3xl font-bold gradient-text">5K+</h3>
            <p className="text-gray-400">Active Users</p>
          </div>

          <div className="glass p-6">
            <h3 className="text-3xl font-bold gradient-text">100%</h3>
            <p className="text-gray-400">Decentralized</p>
          </div>
        </div>
      </section>

      {/* 📖 ABOUT */}
      <section className="section max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          About <span className="gradient-text">MintVerse</span>
        </h2>

        <p className="text-gray-400 leading-relaxed mb-4">
          MintVerse is a next-generation NFT platform designed to empower creators and collectors.
          With seamless minting, decentralized storage, and a modern user experience, anyone can
          participate in the Web3 ecosystem.
        </p>

        <p className="text-gray-400 leading-relaxed">
          Whether you're an artist, developer, or collector, MintVerse provides the tools to create,
          own, and explore digital assets with complete transparency and security.
        </p>
      </section>

      {/* 🔥 CALL TO ACTION */}
      <section className="section text-center">
        <div className="glass p-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your First NFT?
          </h2>

          <p className="text-gray-400 mb-6">
            Join the future of digital ownership and start minting your NFTs today.
          </p>

          <button className="btn-primary text-lg px-8 py-3">
             Mint Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default HomeV1;

