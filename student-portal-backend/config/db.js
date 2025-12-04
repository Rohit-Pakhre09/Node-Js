import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log("Error while starting server: ", error.message);
    }
};