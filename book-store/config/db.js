import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log("There is an error in connecting MongoDB Book Store DB!");
        res.status(500).json({ error });
    }
}