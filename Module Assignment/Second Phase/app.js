import { initLogger, getLogPath } from './loggerModule.js';
import { printName } from './nameModule.js';
import { addTwo } from './addModule.js';
import * as math from './mathModule.js';
import { writeData } from './fileWriter.js';
import { readData } from './fileReader.js';
import { exists } from './fileExists.js';
import { countWords } from './wordCount.js';
import { today, now } from './dateUtil.js';
import { randomBetween } from './randomRange.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, 'data.txt');

// 1. Print name
console.log('\n[1] Name Module');
printName('Rohit Pakhre');

// 2. Add two numbers (module)
console.log('\n[2] Add Module');
console.log('addTwo(3,4) =', addTwo(3, 4));

// 3. Math module functions
console.log('\n[3] Math Module');
console.log('add(10,5)=', math.add(10, 5));
console.log('subtract(10,5)=', math.subtract(10, 5));
console.log('multiply(10,5)=', math.multiply(10, 5));
console.log('divide(10,5)=', math.divide(10, 5));

// 4. Write and read data
console.log('\n[4] File Writer/Reader');
const sampleText = `This is sample data written on ${now()}`;
if (!exists(dataFile)) {
    writeData(sampleText, dataFile);
    console.log('Data written to', dataFile);
} else {
    console.log('Data file already exists at', dataFile);
}

const readText = readData(dataFile);
console.log('Read from file:', readText);

// 5. Logger module (demonstrate that logs are also saved to log.txt)
console.log('\n[5] Logger Module');
console.log('Log file path:', getLogPath());
console.log('This message will be saved to the log file.');

// 6. Word count
console.log('\n[6] Word Count Module');
console.log('Word count of read text:', countWords(readText));

// 7. Date utils
console.log('\n[7] Date Utilities');
console.log('Today:', today());
console.log('Now:', now());

// 8. Random number
console.log('\n[8] Random Number Module');
console.log('Random between 1 and 100:', randomBetween(1, 100));

// 9. File exists check
console.log('\n[9] File Exists Module');
console.log('Does data file exist?', exists(dataFile));

console.log('\nSecond phase combined app complete.');
