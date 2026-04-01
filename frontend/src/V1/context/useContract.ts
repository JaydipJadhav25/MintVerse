import { ethers } from "ethers";
import { useCallback } from "react";
import { CONTRACT_CONFIG } from "../contract/contract.config";




export const useContract = () => {

    // Get contract instance with signer => this is internal function
    const getContract = useCallback(async (needsSigner = false) => {
        if (!window.ethereum) {
            throw new Error('Please install MetaMask or another Web3 wallet');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);

        if (needsSigner) {

            const signer = await provider.getSigner();

            return new ethers.Contract(
                CONTRACT_CONFIG.address,
                CONTRACT_CONFIG.abi,
                signer
            );
        }

        return new ethers.Contract(
            CONTRACT_CONFIG.address,
            CONTRACT_CONFIG.abi,
            provider
        );
    }, []);

    //mintUser NFt
    const mintNft = useCallback(async (nftUrl: string) => {
        try {
            const contract = await getContract(true);

            // Send transaction
            const tx = await contract.mintNft(nftUrl);

            console.log("Transaction sent:", tx.hash);

            // Wait for confirmation
            const receipt = await tx.wait();

            console.log("Transaction confirmed:", receipt);

            return {
                success: true,
                txHash: tx.hash,
                tokenId: receipt?.logs?.[0]?.topics?.[3] // optional decode
            };

        } catch (error: any) {

            console.error("Error mintNft service:", error);  

            return {
                success: false,
                error: error?.reason || error?.message || "Mint failed"
            };
        }
    }, [getContract]);

    //transafer nft => means chnage token ownert
    const transaferNft = useCallback(async( from :string , to : string ,tokenID : number )=>{
         try {
                
            console.log("data : " , from , to , tokenID);
            const contract = await getContract(true);
            // Send transaction =from , to ,tokemid
            const tx = await contract.safeTransferFrom(from , to , tokenID);

            console.log("Transaction sent:", tx.hash);

            // Wait for confirmation
            const receipt = await tx.wait();

            console.log("Transaction confirmed:", receipt);

            return {
                success: true,
                txHash: tx.hash,
            };

        } catch (error: any) {

            console.error("Error transaferNft service:", error);  

            return {
                success: false,
                error: error?.reason || error?.message || "transaferNft failed"
            };
        }
    },[getContract]);


    return {
        mintNft ,
        transaferNft
    }
}