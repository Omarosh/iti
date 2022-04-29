const fs = require("fs");
const readline = require("readline");
// Part 1
const eventModule = require("./event-module");
const mylogger = new eventModule.myLogger();

mylogger.on("data", (data) => console.log("Logger testing: " + data));
mylogger.emit("data", "Hello World");

// Create file sync
fs.writeFileSync("sync_test.txt", "Testing sync write");

// Create file async
fs.writeFile("test-async.txt", "Testing async write", (err, data) => {
  console.log("errors:", err);
});

// Read file sync
let data = fs.readFileSync("sync_test.txt");
console.log(data.toString());

// Read file async
fs.readFile("sync_test.txt", (err, data) => {
  console.log(data.toString());
});

// Read file line by line
const rl = readline.createInterface({
  input: fs.createReadStream("sync_test.txt"),
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  console.log(`Line from file: ${line}`);
});

//Task 5
let rawdata = fs.readFileSync("data.json");
let jsondata = JSON.parse(rawdata);
console.log(jsondata);

// Task #6
fs.writeFileSync("info.txt", "hello iti");

//Task #7 -->>>
if (!fs.existsSync("test-dir")) {
  fs.mkdirSync("test-dir");
}

fs.appendFileSync("sync_test.txt", " Adding");
data = fs.readFileSync("sync_test.txt");
console.log(data.toString());
