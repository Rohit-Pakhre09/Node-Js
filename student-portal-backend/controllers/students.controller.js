import { Student } from "../models/student.model.js";
import path from "path";
import fs from "fs/promises";

// Add Student Data
export const addStudent = async (req, res) => {
    try {
        const { stdId, stdName, email, phone } = req.body;

        if (!stdId || !stdName || !email || !phone) {
            return res.status(400).json({ error: "All fields required" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "ProfileImage is required" });
        }

        const profileImagePath = `/uploads/${req.file.filename}`;

        const student = await Student.create({
            stdId,
            stdName,
            email,
            phone,
            profileImage: profileImagePath,
        });
        return res.status(201).json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};

// Get all Student Data
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get by ID
export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Id is not provided!" });
        }

        const student = await Student.find({ stdId: id });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update By ID
export const updateStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const info = req.body;
        const file = req.file;

        if (!id) {
            res.status(400).json({ message: "Id is not provided!" });
        }

        const student = await Student.findOne({ stdId: id });
        if (!student) {
            return res.status(404).json({ error: "Student not found!" });
        }

        const data = {};

        if (info.stdId) data.stdId = info.stdId;
        if (info.stdName) data.stdName = info.stdName;
        if (info.email) data.email = info.email;
        if (info.phone) data.phone = info.phone;

        if (file) {
            if (student.profileImage) {
                const relativePath = student.profileImage.replace(/^\//, "");
                const absolutePath = path.join(process.cwd(), relativePath);

                try {
                    await fs.unlink(absolutePath);
                } catch (err) {
                    console.warn("Could not delete old image:", err.message);
                }
            }

            data.profileImage = `/uploads/${file.filename}`;
        }

        const result = await Student.updateOne({ stdId: id }, { $set: data });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete By ID
export const deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is not provided!" });
        }

        const student = await Student.findOne({ stdId: id });
        if (!student) {
            return res.status(404).json({ error: "Student not found!" });
        }

        if (student.profileImage) {
            const relativePath = student.profileImage.replace(/^\//, "");
            const absolutePath = path.join(process.cwd(), relativePath);

            try {
                await fs.unlink(absolutePath);
                console.log("Image deleted:", absolutePath);
            } catch (err) {
                console.warn("Could not delete image file:", err.message);
            }
        }

        const result = await Student.deleteOne({ stdId: id });

        return res.status(200).json({ result });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};