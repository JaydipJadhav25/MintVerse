import { Router } from "express";
import {setTokenIdBasedOnmetadataUrl, transaferNft } from "../controller/nft.controller.js";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import { NftModel } from "../model/nft.model.js";
import { History } from "../model/history.model.js";
import { aiAgent } from "../services/aiAgent.service.js";


const upload = multer();
const router = Router();


router.post("/tokenid" , setTokenIdBasedOnmetadataUrl);



router.post("/create", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file" });
    }

    // 1 Upload IMAGE
    const imageData = new FormData();
    imageData.append("file", req.file.buffer, req.file.originalname);

    const imageRes = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      imageData,
      {
        headers: {
          ...imageData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET,
        },
      }
    );

    const imageUrl = `https://lime-solid-cardinal-518.mypinata.cloud/ipfs/${imageRes.data.IpfsHash}`;

    // 2 CREATE METADATA
    const metadata = {
      name: req.body.name,
      description: req.body.description,
      price : req.body.price,
      collection : req.body.collection,
      image: imageUrl,
    };

    // 3 Upload METADATA JSON
    const metaRes = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET,
        },
      }
    );


    const metadataUrl = `https://lime-solid-cardinal-518.mypinata.cloud/ipfs/${metaRes.data.IpfsHash}`;


     //save in db
     await NftModel.create({
      user: req.body.user,
      name: metadata.name,
      description: metadata.description,
      price: metadata.price,
      collection: metadata.collection,
      imageUrl : imageUrl,
      metadataUrl : metadataUrl,
     });

    //  RETURN BOTH
    res
    .status(200)
    .json({
      imageUrl,
      metadataUrl,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create NFT" });
  }
});


router.get("/explors" , async(req , res)=>{
  try {
    const allNfts = await NftModel.find();

    return res.status(200)
     .json({
      data : allNfts
     });
  } catch (error) {
    return res.status(500).json({
      messahe : "fetch All Nfts Error!"
    })
  }
})


router.get("/history" , async(req , res)=>{
  try {
    const allHistory = await History.find();

    return res.status(200)
     .json({
      data : allHistory
     });
  } catch (error) {

    console.log("erorr : " , error);

    return res.status(500).json({
      messahe : "fetch All Nfts History Error!"
    })
  }
});




router.post("/agent" , async(req , res)=>{
    const { message , userId } = req.body;

    try {
        const response = await aiAgent(message ,userId );
        return res.status(200).json({
            message: response
        })
    } catch (error) {
        return res.json({
            message : "error"
        })
    }
})

router.post("/transfer-nft" , transaferNft);

export default router;