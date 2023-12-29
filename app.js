const express = require("express");
const authRouter = require("./routes/authRoute");
const databaseconnect = require("./config/db");


require("dotenv").config();

const app = express();

databaseconnect();
app.use(express.json());

app.use('/api/auth',authRouter)

app.use("/",(req,res)=>{
    res.status(202).json({
        data: "jwt server"
    })
})

module.exports = app