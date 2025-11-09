import fs from 'fs';

export const readData = (filePath) => {
    if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
    return fs.readFileSync(filePath, 'utf8');
};
