import { Books } from "../models/book.model.js";

export const addBook = async (req, res) => {
    try {
        const data = req.body;
        const result = await Books.create(data);
        res.status(201).json({ result });
        return result;
    } catch (error) {
        console.log("Error in the addBook.controller: ", error.message);
        res.status(500).json({ error });
    }
};