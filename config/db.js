const mongoose = require("mongoose")

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017"

const databaseconnect = ()=>{
    mongoose.connect(MONGODB_URL).
    then((conn)=> console.log(`Connected to ${conn.connection.host}`))
    .catch((e)=>console.log(e.message))
}

module.exports = databaseconnect