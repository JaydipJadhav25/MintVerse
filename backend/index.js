import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();

app.get("/", (req, res) => {
  return res.send("<h1>MintVerse</h1>");
});

//  Upload Image to Pinata
// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log("req.file:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ error: "No file received" });
//     }

//     const data = new FormData();

//     console.log("data : ", data);

//     data.append("file", req.file.buffer, req.file.originalname);

//     const response = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       data,
//       {
//         headers: {
//           ...data.getHeaders(),
//           pinata_api_key: process.env.PINATA_API_KEY,
//           pinata_secret_api_key: process.env.PINATA_SECRET,
//         },
//       },
//     );

//     console.log("pinata server reponse : ", response);

//     const url = `https://lime-solid-cardinal-518.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
//     res.status(200).json({ url });

//   } catch (error) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });


//update file with metadata
app.post("/create-nft", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file" });
    }

    // 1️⃣ Upload IMAGE
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

app.listen(5000, () => console.log("Server running on port 5000"));
