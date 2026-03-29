import mongoose from "mongoose";



const historySchema = new mongoose.Schema({
    // Type of action: 'mint', 'transfer', 'sale', or 'burn'
    actionType: { 
        type: String, 
        required: true,
        enum: ['mint', 'transfer', 'list', 'sale'] 
    },
    
    // The Wallet Addresses
    from: { type: String,  }, // For mints, this is usually '0x000...'
    to: { type: String, required: true },
    
    // Token Details
    tokenId: { type: String, required: true },
    nftAddress: { type: String  , default : "0xBdD833DA1989F0803AE212E8BB6be260ca00F462" }, // Contract address
    
    // Transaction Details
    transactionHash: { type: String, required: true, unique: true },
    amount: { type: String, default: '0' }, // Price if it was a sale
    currency: { type: String, default: 'ETH' },
    
    // Metadata for the UI (Optional but helpful for faster loading)
    nftName: String,
    nftImage: String,
    
    timestamp: { type: Date, default: Date.now }


}, { timestamps: true });



// Indexing for faster history lookups
historySchema.index({ from: 1 });
historySchema.index({ to: 1 });
historySchema.index({ tokenId: 1 });

export const History  = mongoose.model('History', historySchema);