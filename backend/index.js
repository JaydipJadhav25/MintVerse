import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import  version1Router from "./routers/version1.routes.js"; 
import  version2Router from "./routers/version2.routes.js"; 
import  nftRouter from "./routers/nft.routes.js"; 
import { aiAgent } from "./services/aiAgent.service.js";

dotenv.config();


//create connection of database
async function conectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODBURL);
        console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1); // Exit with 1 for a failure/error
    }
}




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/v1" , version1Router);
app.use("/v2" , version2Router);
app.use("/nft" , nftRouter);







app.get("/", (req, res) => {
  return res.send("<h1>MintVerse</h1>");
});










conectDB()
.then(()=>{
    app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
})