/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs sequelize sqlite3
    npm install mysql2
    npm install dotenv
    // import 'dotenv/config';
    // const HOST = process.env.SERVER_HOST;
    // const PORT = process.env.SERVER_PORT;
    npm install bcrypt

*/

/* 
    https://sequelize.org/
    
    npm init -y
    npm i --save express sequelize sqlite3 mysql2 dotenv nodemon cors 
    npm i -D nodemon

    npm run dev 
    -> npm error Missing script: "dev"
        -> in package.json eintragen
            "scripts": {
                "dev": "nodemon server.js",
                "start": "node server.js"
            },

*/

import express from "express";
import db from "./models/user.js";
import 'dotenv/config';
import bcrypt from "bcrypt";

const app = express();
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 3000;

// --- MIDDLEWARE & SETTINGS ---
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// --- ROUTEN ---


app.use(express.static("public"));

app.listen(PORT, IP, () => console.log(`Server is running on http://${IP}:${PORT}`));

