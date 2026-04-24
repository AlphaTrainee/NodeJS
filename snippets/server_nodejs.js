/* 
    https://sequelize.org/
    
    npm init -y && npm i --save express ejs sequelize sqlite3
    npm install mysql2
    npm install dotenv
    // import 'dotenv/config';
    // const IP = process.env.SERVER_IP;
    // const PORT = process.env.SERVER_PORT;
    
    ODER (Windows Alias)
    npmi

    Daten mariadb
    DB:       alpha
    User:     alpha
    Password: service
*/


import express from "express";

const app = express();
const IP = "127.0.0.1";
const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, IP, () => console.log(`Server is running on http://${IP}:${PORT}`));

