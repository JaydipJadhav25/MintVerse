import { WalletProvider } from "./context/WalletProvider"
import {BrowserRouter , Route, Routes} from "react-router-dom"
import MintNFT from "./pages/MintNFT"
import Index from "./pages/Index"


const AppRouter = () =>{
  return(
       <>
       <Routes>
        <Route path="/" element={ <Index/>}/>
        <Route path="/mintNft" element={ <MintNFT/>}/>
       </Routes>
       </>
  )
}






function App() {
  return (
    <>
    <BrowserRouter>
    <WalletProvider>
      <AppRouter/>
    </WalletProvider>
    </BrowserRouter>
    </>
  )
}

export default App
