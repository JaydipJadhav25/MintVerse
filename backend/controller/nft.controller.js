import { History } from "../model/history.model.js";
import { NftModel } from "../model/nft.model.js";



export const setTokenIdBasedOnmetadataUrl = async(req , res) =>{
    try {

        const {tokenId , metadataUrl  , txHash} = req.body;

        console.log("tokenId , metadataUrl  , txHash : " , tokenId , metadataUrl  , txHash);
           
           if(!tokenId || !metadataUrl) {
            return res.status(401).json({
            success : false,
            message :  "tokenId , metadataUrl requried!"
            })
        }


        //find in db on metadataUrl = this is uqnie for each diff file
        const exitNft = await NftModel.findOne({metadataUrl : metadataUrl});
         
        console.log(exitNft);

        if(!exitNft) {
            return res.status(401).json({
            success : false,
            message :  "NFt Not Found!"
            })
        }
    
        //update tokenId
      const updateNft =  await NftModel.findOneAndUpdate({
            metadataUrl : metadataUrl
        }, {
            tokenId : tokenId,
            isMint : true
        },{
            new : true
        });


          
        console.log("updatenft : " , updateNft)

        //save in history
      const history =   await History.create({
            actionType: "mint",
            to : updateNft.user,
            tokenId : tokenId,
            transactionHash : txHash,
            amount : updateNft.price,
        });


        console.log("history : " , history);

        return res.status(200).json({
                success : true,
                message :  "Successfully Stored tokenID!"
        })
        
    } catch (error) {
        
        console.log("error : " , error);

        return res.status(500).json({
            success : false,
            message :  "tokenId Store Error!"
        })
    }
}