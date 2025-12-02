import express from "express";
import { addBook } from "../controllers/addBook.controller.js";
import { getDataById } from "../controllers/getDataById.controller.js";
import { getAllData } from "../controllers/getAllData.controller.js";
import { updateData } from "../controllers/updateData.controller.js";
import { deleteData } from "../controllers/deleteData.controller.js";

const router = express.Router();

router.post("/", addBook);
router.get("/:id", getDataById);
router.get("/", getAllData);
router.patch("/:id", updateData);
router.delete("/:id", deleteData)

export default router;