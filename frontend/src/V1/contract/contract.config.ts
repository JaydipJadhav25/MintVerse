import contractABI from "./abi.json";

// Contract deployment address on Sepolia network
export const CONTRACT_ADDRESS = '0xBdD833DA1989F0803AE212E8BB6be260ca00F462';

// Contract ABI
export const CONTRACT_ABI = contractABI;


export const CONTRACT_CONFIG = {
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
} as const;
