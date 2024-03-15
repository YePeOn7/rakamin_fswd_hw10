const express = require('express')
const path = require("path");
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler.js");
const fs = require("fs");
const app = express();
require("dotenv").config()

const uploadPath = "uploads"

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath);
}

//json body parser
app.use(express.json());

app.get("/", async (req, res) => {
    try{
        res.send("ok");
    }
    catch(err){
        nextTick(err);
    }
});

app.use(router);
app.use(errorHandler);

app.listen(3000);