import express from "express";
import router from "./routes/routes.js";
import logger from "./middleware/logger.js";
import { connectDB } from "./config/db.js";

export const app = express();
await connectDB();

// Middlewares
app.use(express.json());
app.use(router);
app.use(logger);