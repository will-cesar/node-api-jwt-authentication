require("dotenv").config();
const mongoose = require('mongoose');

const DB_URL_CONNECTION = process.env.DB_URL_CONNECTION;

const connectDb = () => {
    return mongoose
        .connect(
            DB_URL_CONNECTION, 
            error => {
                if (error) {
                    console.log("Connection to DB failed!!");
                }
                else {
                    console.log('Connection to DB success!!');
                }
            }
        );
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

module.exports = connectDb;