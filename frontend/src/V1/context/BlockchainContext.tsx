// import { createContext, useEffect, useState } from "react";
// import { useWallet } from "./WalletProvider";

// export const BlockchainCotext = createContext<any>(undefined);

// export const BlockchainCotextProvider = ({ children }: { children: any }) => {

//     //flow =>
//     //1.first checkwallet connect , and use walletconnet context
//     //2 .use useffect to depoend on wallet connect check and create a object of contract
//    //3. and set signer in state 

//    const[contract , setContract] = useState();

//    const{ connectWallet , account } = useWallet();
 

//     useEffect









//   return (
//     <BlockchainCotext.Provider
//      value={""}
//      >{children}</BlockchainCotext.Provider>
//   );
// };
