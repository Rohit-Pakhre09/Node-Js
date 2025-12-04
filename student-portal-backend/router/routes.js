import express from "express";
import { upload } from "../middleware/upload.js";
import { addStudent, deleteStudentById, getAllStudents, getStudentById, updateStudentById } from "../controllers/students.controller.js";

const router = express.Router();

router.post("/", upload.single("profileImage"), addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("profileImage"), updateStudentById);
router.delete("/:id", deleteStudentById);

export default router;