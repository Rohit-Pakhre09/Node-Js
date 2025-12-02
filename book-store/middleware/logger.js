import fs from "fs";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const rootDir = path.dirname(currentDir);

const logsDir = path.join(rootDir, "logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
}

const logsFile = path.join(logsDir, "access.log");

const logStream = fs.createWriteStream(logsFile, {
    flags: "a"
});

const logger = morgan("combined", { stream: logStream });
export default logger;