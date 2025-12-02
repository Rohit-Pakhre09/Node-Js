import { Books } from "../models/book.model.js";

export const updateData = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await Books.findOneAndUpdate({ bookId: id }, { $set: data }, { new: true });
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in the updateBookController", error.message);
        res.status(500).json({ error });
    }
};