import { Books } from "../models/book.model.js";

export const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Books.deleteOne({ bookId: id });
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in the updateBookController", error.message);
        res.status(500).json({ error });
    }
};