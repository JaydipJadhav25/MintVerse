import { WalletProvider } from "./V1/context/WalletProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import MintNFT from "./V1/pages/MintNFT";
import Explore from "./V1/pages/Explore";
import V1Layout from "./V1/pages/V1Layout";
import HomeV1 from "./V1/components/HomeV1";
import "./V1/v1.css";
import V2Layout from "./V2/pages/V2Layout";
import HomeV2 from "./V2/components/HomeV2";
import MintNFTV2 from "./V2/pages/MintNFTV2";
import ExploreV2 from "./V2/pages/ExploreV2";
import History from "./V1/pages/History";

const AppRouter = () => {
  return (
    <>
      <Routes>
          {/* this is version v1 */}
        {/* <Route path="/" element={<IndexV1 />} />
        <Route path="/mintNft" element={<MintNFT />} />
        <Route path="/explore" element={<Explore/>}/> */}

        <Route path="/" element={<V1Layout/>}>
        <Route index element={<HomeV1/>}/>
        <Route path="mintNft" element={<MintNFT />} />
        <Route path="explore" element={<Explore/>}/>
        <Route path="transcation" element={<History/>} />
        </Route>

        {/* V2 (Nested Routes) */}
        <Route path="/v2" element={<V2Layout/>}>
          <Route  index element={<HomeV2/>}/>
          <Route path="mintNft" element={<MintNFTV2 />} />
          <Route path="explore" element={<ExploreV2/>}/>
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <WalletProvider>
          <AppRouter />
          <Toaster position="top-center" />
        </WalletProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
