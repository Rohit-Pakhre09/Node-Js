import mongoose from "mongoose";

export const connectDb = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log("Database connected.");
    } catch (error) {
        console.log("Error, while connecting to database: ", error.message);
    }
}