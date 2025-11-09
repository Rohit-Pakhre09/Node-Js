import fs from 'fs';

export const exists = (filePath) => fs.existsSync(filePath);
