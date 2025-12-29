import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";

export const connectDB = asyncHandler(async (uri) => {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
});