import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.join(__dirname, 'log.txt');

let originalLog = console.log;

export const initLogger = () => {
    originalLog = console.log.bind(console);
    console.log = (...args) => {
        try {
            const line = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') + '\n';
            fs.appendFileSync(logFile, line, 'utf8');
        } catch (err) {
            originalLog('Logger write failed:', err.message);
        }
        originalLog(...args);
    };
};

export const restoreLogger = () => {
    console.log = originalLog;
};

export const getLogPath = () => logFile;
