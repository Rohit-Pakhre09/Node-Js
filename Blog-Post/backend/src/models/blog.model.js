import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Technology", "Lifestyle", "Travel", "Food", "Health", "Business", "Entertainment", "Sports", "Other"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogModel);