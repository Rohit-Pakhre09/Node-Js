import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./src/routes/routes.js";

export const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api", router);
