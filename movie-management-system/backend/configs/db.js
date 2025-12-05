import mongoose from "mongoose";

export const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log("DB Server Started");
    } catch (error) {
        console.log("Server Problem: ", error.message);
    }
};