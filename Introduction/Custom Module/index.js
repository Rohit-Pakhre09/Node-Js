const fs = require('fs');
const path = require('path');

const data = "<html><head><title>Custom Module</title></head></html>";
const outPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outPath, data, 'utf8');