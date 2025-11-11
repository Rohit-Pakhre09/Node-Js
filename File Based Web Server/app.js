import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const route = {
    home: path.join(__dirname, "pages/index.html"),
    about: path.join(__dirname, "pages/about.html"),
    contact: path.join(__dirname, "pages/contact.html"),
    errorPage: path.join(__dirname, "pages/errorPage.html")
};

// Logs Code
const logsDir = path.join(__dirname, 'logs');
const logFile = path.join(logsDir, 'server.log');
try {
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
} catch (err) {
    console.error('Could not ensure logs directory:', err);
}

function logRequest(req) {
    try {
        const line = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
        fs.appendFile(logFile, line, (err) => {
            if (err) console.error('Failed to write to log:', err);
        });
    } catch (err) {
        console.error('Logging error:', err);
    }
}

const server = http.createServer((req, res) => {
    logRequest(req);
    if (req.url === "/") {
        fs.readFile(route.home, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Server Error: " + (err && err.message ? err.message : String(err)));
                return;
            }
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);

        })
    } else if (req.url === "/about") {
        fs.readFile(route.about, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Server Error: " + (err && err.message ? err.message : String(err)));
                return;
            }
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);

        })
    } else if (req.url === "/contact") {
        fs.readFile(route.contact, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Server Error: " + (err && err.message ? err.message : String(err)));
                return;
            }
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);

        })
    } else if (req.url === "/data") {
        const payload = {
            message: "Hello from the file-based web server",
            timestamp: new Date().toISOString(),
            requestedUrl: req.url
        };
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(payload));
    } else {
        fs.readFile(route.errorPage, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Server Error: " + (err && err.message ? err.message : String(err)));
                return;
            }
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        })
    }
}).listen(PORT, () => {
    console.log("The Port is running on the http://localhost:5000");
});