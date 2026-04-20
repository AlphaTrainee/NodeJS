import fs from "fs";
import zlib from "zlib";
/* 
fs.readFile("./products.html", "utf8", (err, data) => {
    fs.writeFile("./products.html.gz", zlib.gzipSync(data), err => {
        if(err) throw err;
    })
});

 */

const compressor = zlib.createGzip();
const inputStream = fs.createReadStream("./products.html", "utf8");
const outputStream = fs.createWriteStream("./products.html.gz");

