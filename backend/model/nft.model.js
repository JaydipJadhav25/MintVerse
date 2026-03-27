import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  tokenId : Number,
  name: String,
  description: String,
  price: String,
  collection: String,
  imageUrl : String,
  metadataUrl : String,
  isMint : {
    type : Boolean,
    default : false
  }
});


export const NftModel = mongoose.model("nfts" , nftSchema);