import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        default: "English"
    },
    pages: {
        type: Number,
    },
    category: {
        type: String,
        enum: ["Fiction", "Non-Fiction", "Science", "Technology", "Kids", "Fantasy", "Biography"]
    },
    isbn: {
        type: String, unique: true, required: true
    },
},
    { timestamps: true }
);

export const Books = mongoose.model("Books", bookSchema);