import { Books } from "../models/book.model.js";

export const getDataById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Id is required!" });

    try {
        const result = await Books.findOne({ bookId: id });
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in the getIdByController", error.message);
        res.status(500).json({ error });
    }
}