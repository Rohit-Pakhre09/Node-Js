import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import morgan from "morgan";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, "logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdir(logsDir)
}

const accessLogStream = fs.createWriteStream(
    path.join(logsDir, "access.log"),
    { flags: "a" }
)

app.use(morgan("combined", { stream: accessLogStream }))

const route = {
    home: path.join(__dirname, "./pages/index.html"),
    about: path.join(__dirname, "./pages/about.html"),
    contact: path.join(__dirname, "./pages/contact.html"),
    errorPage: path.join(__dirname, "./pages/errorPage.html"),
};

const pagesRender = (res, filePath, statusCode) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).send("There is an error in the system.");
        res.status(statusCode).send(data);
    });
};

app.get("/", (req, res) => {
    pagesRender(res, route.home, 200);
});

app.get("/about", (req, res) => {
    pagesRender(res, route.about, 200);
});

app.get("/contact", (req, res) => {
    pagesRender(res, route.contact, 200);
});

app.use((req, res) => {
    pagesRender(res, route.errorPage, 404);
});