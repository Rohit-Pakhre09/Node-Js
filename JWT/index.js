import express from "express";
import { router } from "./src/routes/routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middleware/error.middleware.js";
import cors from "cors";
import helmet from "helmet";

export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/", router);
app.use(errorHandler);