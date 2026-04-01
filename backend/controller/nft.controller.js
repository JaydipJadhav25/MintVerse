import { History } from "../model/history.model.js";
import { NftModel } from "../model/nft.model.js";

export const setTokenIdBasedOnmetadataUrl = async (req, res) => {
  try {
    const { tokenId, metadataUrl, txHash } = req.body;

    console.log(
      "tokenId , metadataUrl  , txHash : ",
      tokenId,
      metadataUrl,
      txHash,
    );

    if (!tokenId || !metadataUrl) {
      return res.status(401).json({
        success: false,
        message: "tokenId , metadataUrl requried!",
      });
    }

    //find in db on metadataUrl = this is uqnie for each diff file
    const exitNft = await NftModel.findOne({ metadataUrl: metadataUrl });

    console.log(exitNft);

    if (!exitNft) {
      return res.status(401).json({
        success: false,
        message: "NFt Not Found!",
      });
    }

    //update tokenId
    const updateNft = await NftModel.findOneAndUpdate(
      {
        metadataUrl: metadataUrl,
      },
      {
        tokenId: tokenId,
        isMint: true,
      },
      {
        new: true,
      },
    );

    console.log("updatenft : ", updateNft);

    //save in history
    const history = await History.create({
      actionType: "mint",
      to: updateNft.user,
      tokenId: tokenId,
      transactionHash: txHash,
      amount: updateNft.price,
    });

    console.log("history : ", history);

    return res.status(200).json({
      success: true,
      message: "Successfully Stored tokenID!",
    });
  } catch (error) {
    console.log("error : ", error);

    return res.status(500).json({
      success: false,
      message: "tokenId Store Error!",
    });
  }
};






export const transaferNft = async (req , res) => {
  try {
    //flow => 
        //1 chnage address of nft of user 
       // 2 then create history and store

       
       const{from , to, tokenId , txHash } = req.body;
       
       console.log("data : " , from , to, tokenId , txHash );


         if(!from || !to || !tokenId || !txHash){
         return res.status(401).json({
            success: false,
            message : "all fileds is requied!"
         })
       };

       //finde nft based on token
       const updateNft = await NftModel.findOneAndUpdate({
        tokenId : tokenId
       } ,{
        user : to
       } ,{
        new :true
       });

       if(!updateNft){
         return res.status(401).json({
            success: false,
            message : "tokenId is Wrong"
         })
       };

       //create history
          //save in history
    const history = await History.create({
      actionType: "transfer",
      from : from,
      to: to,
      tokenId: tokenId,
      transactionHash: txHash,
      amount: updateNft.price,
    });

      if(!history){
         return res.status(501).json({
            success: false,
            message : "History create error!"
         })
       };

    
       return res.status(200).json({
        success: true,
        message : "Transafer NFt Suucessfully"
       });


  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      success: false,
      message: "Transafer NFt  Error!",
    });
  }
};
