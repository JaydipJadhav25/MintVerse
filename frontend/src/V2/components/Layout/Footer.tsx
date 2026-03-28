function Footer() {
  return (
    <footer className="navbar mt-28 border-t border-white/5">
      {" "}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {" "}
        {/* 🔮 BRAND */}{" "}
        <div>
          {" "}
          <h1 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {" "}
            <span className="gradient-text">MintVerse</span>{" "}
            <span className="text-xs px-2 py-[2px] rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
              {" "}
              AI{" "}
            </span>{" "}
          </h1>{" "}
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {" "}
            A next-generation NFT platform powered by AI verification,
            decentralized storage, and blockchain ownership.{" "}
          </p>{" "}
        </div>{" "}
        {/* 📌 PRODUCT */}{" "}
        <div>
          {" "}
          <h3 className="text-sm font-semibold mb-4 text-white">
            Product
          </h3>{" "}
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Explore NFTs
            </li>{" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Mint NFT
            </li>{" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Dashboard
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* 🛠 RESOURCES */}{" "}
        <div>
          {" "}
          <h3 className="text-sm font-semibold mb-4 text-white">
            Resources
          </h3>{" "}
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Docs
            </li>{" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">API</li>{" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Blog
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* 🔐 LEGAL */}{" "}
        <div>
          {" "}
          <h3 className="text-sm font-semibold mb-4 text-white">Legal</h3>{" "}
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Privacy Policy
            </li>{" "}
            <li className="hover:text-[var(--primary)] cursor-pointer">
              Terms of Service
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      {/* 🔻 Bottom */}{" "}
      <div className="border-t border-white/5 py-6 text-center text-sm text-[var(--text-secondary)]">
        {" "}
        © 2026 MintVerse AI. All rights reserved.{" "}
      </div>{" "}
    </footer>
  );
}

export default Footer;
