import express from "express";
import { connectDB, createEmployeeData, deleteEmployeeData, globalSearch, showAllEmployees, showEmployeeDataByID, updateEmployeeData } from "./db.js";

export const app = express();

// Middleware
app.use(express.json());

// All data route
app.get("/api/", async (req, res) => {
    try {
        const result = await showAllEmployees();
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ Error: error.message });
    }
});

// Searching Route
app.get("/api/search", async (req, res) => {
    const { q, ...fields } = req.query;

    try {
        if (q) {
            const result = await globalSearch(q);
            if (result.length === 0) {
                return res.status(404).json({ Message: "No matching employees found" });
            }
            return res.status(200).json(result);
        }

        if (Object.keys(fields).length > 0) {
            const collection = await connectDB();
            const query = {};

            for (const key in fields) {
                query[key] = new RegExp(fields[key], "i");
            }
            const result = await collection.find(query).toArray();

            if (result.length === 0) {
                return res.status(404).json({ Message: "No matching employees found" });
            }

            return res.status(200).json(result);
        }

        return res.status(400).json({
            Error: "No matching employees found"
        });

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ Error: error.message });
    }
});

// Get data by ID
app.get("/api/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await showEmployeeDataByID(id, res);
        if (!result) return res.status(404).json({ Error: "Employee not found" });
        return res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ Error: error.message });
    }
});

// Create data route
app.post("/api/post", async (req, res) => {
    const data = req.body;

    try {
        const result = await createEmployeeData(data);
        res.status(201).json(result);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ Error: error.message });
    }
});

// Update data by ID
app.patch("/api/update/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await updateEmployeeData(id, data);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ Error: error.message });
    }
});

// Delete data by id
app.delete("/api/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteEmployeeData(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ Error: error.message });
    }
});

// Default Route
app.use("/", (req, res) => {
    res.send("Server Started!")
});