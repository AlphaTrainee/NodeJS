import fs from "fs";
import zlib from "zlib";

// fs.readFile("./products.html", "utf8", (err, data) => {
//     fs.writeFile("./products.html.gz", zlib.gzipSync(data), err => {
//         if (err) throw err;
//     });
// });

// Dateien im Stream verarbeiten
const compressor    = zlib.createGzip();
const inputStream   = fs.createReadStream("./products.html", "utf8");
const outputStream  = fs.createWriteStream("./products.html.gz");

inputStream.pipe(compressor).pipe(outputStream);

console.log("ready");