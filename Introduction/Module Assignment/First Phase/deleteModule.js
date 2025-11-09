import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultPath = path.join(__dirname, 'index.txt');

export const deleteFileModule = (route = defaultPath) => {
    try {
        if (!fs.existsSync(route)) return false;
        fs.unlinkSync(route);
        return true;
    } catch (err) {
        throw err;
    }
};
