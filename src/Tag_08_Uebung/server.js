/* 
    npm init -y && npm i express ejs
    ODER (Windows Alias)
    npmi
*/

import express from "express";

const app = express();
const IP = "127.0.0.1";
const PORT = 3000;

// In deiner Express-Route oder statischen Konfiguration
app.use(express.static('public', {
  setHeaders: function (res, path) {
    if (path.endsWith('.part')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

app.listen(PORT, IP, () => console.log(`Server is running on http://${IP}:${PORT}`));
