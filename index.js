const express = require("express");
const app = express();
require("./dbconfig")


app.listen(3000,() =>{
    console.log("Serveur démarrer");
})