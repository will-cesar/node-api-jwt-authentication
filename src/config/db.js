require("dotenv").config();
const mongoose = require('mongoose');

const DB_URL_CONNECTION = process.env.DB_URL_CONNECTION;

const connectDb = () => {
    mongoose.connect(
        DB_URL_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    const db = mongoose.connection;
    db.on("error", error => console.error(error));
    db.once("open", () => console.log('Connected to the database!'));
}


module.exports = connectDb;