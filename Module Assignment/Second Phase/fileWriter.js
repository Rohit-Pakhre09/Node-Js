import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultFile = path.join(__dirname, 'data.txt');

export const writeData = (content, filePath = defaultFile) => {
    fs.writeFileSync(filePath, String(content), 'utf8');
    return filePath;
};
