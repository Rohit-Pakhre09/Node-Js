import { MongoClient } from "mongodb";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

let collectionArr;

// Database connection
const connectDB = async () => {
    if (collectionArr) return collectionArr;

    await client.connect();
    console.log("Database connected");

    const db = client.db("employeesDB");
    collectionArr = db.collection("employees");

    return collectionArr;
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

// Ge Data by ID: READ
export const showEmployeeDataByID = async (id, res) => {
    try {
        const collection = await connectDB();
        const result = collection.findOne({ emp_id: id });
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
        const result = collection.updateOne({ emp_id: id }, { $set: data });
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
