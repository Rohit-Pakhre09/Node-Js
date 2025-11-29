import express from "express";
import { createEmployeeData, deleteEmployeeData, showAllEmployees, showEmployeeDataByID, updateEmployeeData } from "./db.js";

// App Instance
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
})

// Default Route
app.use("/", (req, res) => {
    res.send("Server Started!")
});