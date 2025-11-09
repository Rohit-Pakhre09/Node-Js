import { writeFileModule } from "./writeFileModule.js";
import { appendFileModule } from "./appendModule.js";
import { deleteFileModule } from "./deleteModule.js";
import { startServer } from "./httpServerModule.js";
import { startJSONServer } from "./jsonServerModule.js";
import { startTimeLoggerServer } from "./timeLoggerServer.js";
import { getAbsolutePath, getFileName } from "./pathModule.js";
import { getOSInfo, toMB } from "./osModule.js";

console.log('\n1. File Operations:');
console.log("Content written in file: ", writeFileModule("Hello Guys"));
console.log("Content appended to file: ", appendFileModule("This is appended text!"));
try {
    const deleted = deleteFileModule();
    console.log("File deleted:", deleted);
} catch (err) {
    console.error("Error deleting file:", err.message);
}

console.log('\n2. Path Information:');
console.log("Absolute path:", getAbsolutePath());
console.log("File name and extension:", getFileName());

console.log('\n3. OS Information:');
const osInfo = getOSInfo();
console.log("Platform:", osInfo.platform);
console.log("CPU Architecture:", osInfo.arch);
console.log("Total Memory:", toMB(osInfo.totalMemory));

console.log('\n4. Starting Servers:');
console.log("A. Basic HTTP Server:");
startServer();  

console.log("B. JSON Server:");
startJSONServer(); 

console.log("C. Time Logger Server:");
startTimeLoggerServer(); 

console.log("\nAll servers are running! You can access them at:");
console.log("- Basic HTTP: http://localhost:3000");
console.log("- JSON API : http://localhost:3001");
console.log("- Time Logger: http://localhost:3002");