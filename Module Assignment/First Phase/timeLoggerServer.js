import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3002;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.join(__dirname, 'request_timestamps.txt');

export const createTimeLoggerServer = () => {
    const server = http.createServer((req, res) => {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFile, `Request received at: ${timestamp}\n`);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Timestamp logged: ${timestamp}\nCheck request_timestamps.txt for all logs.`);
    });

    return server;
};

export const startTimeLoggerServer = () => {
    return http.createServer((req, res) => {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFile, `Request received at: ${timestamp}\n`);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Timestamp logged: ${timestamp}\nCheck request_timestamps.txt for all logs.`);
    })
        .listen(PORT, () => {
            console.log(`Time Logger Server is running at http://localhost:${PORT}`);
            console.log(`Timestamps are being logged to: ${logFile}`);
        });
};
