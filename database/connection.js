// import mongoose from "mongoose";
const mongoose = require("mongoose");

const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri)
        console.log("Database connected successfully")
    } 
    catch (error) {
        console.log("Error connecting to database", error)
    }
}

module.exports = databaseConnect;