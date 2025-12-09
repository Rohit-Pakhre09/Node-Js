import mongoose from "mongoose";

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Database server started.");
    } catch (error) {
        console.log("Error in server: ", error.message);
    }
};