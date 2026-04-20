import fs from "fs";

fs.readFile(
    "./products.csv",
    "utf8",
    (err, data) => {
        if (err) return console.log(err);
        console.log(data);
    }
);

console.log("start for");
for (let i = 0; i < 100000000; i++) {}
console.log("end for");

console.log("ready");