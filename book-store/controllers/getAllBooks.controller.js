import { Books } from "../models/book.model.js";

export const getAllData = async (req, res) => {
    const { q } = req.query;

    try {
        let filter = {};

        if (q) {
            filter = {
                $or: [
                    { bookName: { $regex: q, $options: "i" } },
                    { author: { $regex: q, $options: "i" } },
                    { language: { $regex: q, $options: "i" } },
                    { category: { $regex: q, $options: "i" } },
                    { isbn: { $regex: q, $options: "i" } },
                    { publishYear: Number(q) || 0 },
                    { price: Number(q) || 0 },
                    { pages: Number(q) || 0 }
                ]
            };
        }

        const result = await Books.find(filter);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in getAllBooksController", error.message);
        res.status(500).json({ error: error.message });
    }
};