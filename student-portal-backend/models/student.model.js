import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    stdId: { type: String },
    stdName: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: Number },
    profileImage: { type: String, required: true },
}, { timestamps: true });

export const Student = mongoose.model("Student", studentSchema);