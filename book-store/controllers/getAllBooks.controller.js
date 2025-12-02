import { Books } from "../models/book.model.js";

export const getAllData = async (req, res) => {
    try {
        const result = await Books.find();
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in the getAllBookController", error.message);
        res.status(500).json({ error });
    }
};