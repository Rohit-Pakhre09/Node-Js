import { MongoClient } from "mongodb";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

// Database connection
export const connectDB = async () => {
    await client.connect();
    
    const db = client.db("employeesDB");
    const collection = db.collection("employees");

    return collection;
}

// Create one data: CREATE
export const createEmployeeData = async (data) => {
    try {
        const collection = await connectDB();

        const existEmployee = await collection.findOne({
            $or: [
                { email: data.email },
                { emp_id: data.emp_id }
            ]
        });

        if (existEmployee) throw new Error("Employee Already exists");

        const result = await collection.insertOne(data);
        console.log("Data Added");
        return result;
    }
    catch (error) {
        console.log("Error: ", error.message);
        throw new Error(error.message || "There is server error!");
    }
};

// Show all the data: READ
export const showAllEmployees = async () => {
    try {
        const collection = await connectDB();
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("There is server error!");
    }
};

// Get Data by ID: READ
export const showEmployeeDataByID = async (id, res) => {
    try {
        const collection = await connectDB();
        const result = await collection.findOne({ emp_id: id });
        return result
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("There is server error!");
    }
};

// Update Data by ID: UPDATE
export const updateEmployeeData = async (id, data) => {
    try {
        const collection = await connectDB();
        const result = await collection.updateOne({ emp_id: id }, { $set: data });
        return result
    } catch (error) {
        console.log("Error: ", error.message);
        throw new Error("There is server error!");
    }
};

// Delete Data by ID: DELETE
export const deleteEmployeeData = async (id) => {
    try {
        const collection = await connectDB();
        const result = await collection.deleteOne({ emp_id: id });
        return result;
    } catch (error) {
        console.log("Error:", error.message);
        throw new Error("There is server error!");
    }
};

// Search Route
export const globalSearch = async (query) => {
    try {
        const collection = await connectDB();
        const regex = new RegExp(query, "i");

        const result = await collection.find({
            $or: [
                { emp_id: regex },
                { fullName: regex },
                { email: regex },
                { phone: regex },
                { age: regex },
                { gender: regex },
                { department: regex },
                { role: regex },
                { salary: regex },
                { joiningDate: regex },
                { status: regex }
            ]
        }).toArray();

        return result;
    } catch (error) {
        throw new Error("Error in global search");
    }
};