import express from "express";
import { addBook } from "../controllers/addBook.controller.js";
import { getDataById } from "../controllers/getBookById.controller.js";
import { getAllData } from "../controllers/getAllBooks.controller.js";
import { updateData } from "../controllers/updateBook.controller.js";
import { deleteData } from "../controllers/deleteBook.controller.js";

const router = express.Router();

router.post("/", addBook);
router.get("/:id", getDataById);
router.get("/", getAllData);
router.patch("/:id", updateData);
router.delete("/:id", deleteData)

export default router;