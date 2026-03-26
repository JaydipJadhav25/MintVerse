import { WalletProvider } from "./context/WalletProvider"
import Index from "./pages"

function App() {


  return (
    <>
    <WalletProvider>
      <Index/>
    </WalletProvider>
    </>
  )
}

export default App
