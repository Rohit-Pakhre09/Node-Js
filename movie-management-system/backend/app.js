import express from "express";
import cors from "cors";
import router from "./router/routes.js";

export const app = express();

app.use(express());
app.use(cors());
app.use(router);