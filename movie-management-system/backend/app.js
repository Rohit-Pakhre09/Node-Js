import express from "express";
import cors from "cors";
import router from "./router/routes.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/uploads", express.static("uploads"));