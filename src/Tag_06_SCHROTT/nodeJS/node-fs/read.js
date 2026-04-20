/* "use strict";

const fs = require("fs");

const data = fs.readFileSync;
 */

import fs from "fs";

fs.readFile(
    "./products.csv",
    "utf8",
    (err, data) => {
        if (err) return console.log(err);
        console.log(data);
    }
);

