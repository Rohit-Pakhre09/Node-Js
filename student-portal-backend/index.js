import express from "express";
import router from "./router/routes.js";

export const app = express();

app.use(express.json());

app.use("/", router);
app.use("/uploads", express.static("uploads"));