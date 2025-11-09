import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const r = path.join(__dirname, "index.txt");

export const appendFileModule = (newContent, route = r) => {
    fs.appendFileSync(route, "\n" + newContent);
    return newContent;
}
