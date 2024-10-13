

// require('dotenv').config();
require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")


// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const MONGO_URL = process.env.ATLASDB_URL;
console.log(MONGO_URL);

main()
    .then(() => {
        console.log("connection to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "65fad05a83a0197c15f693d5",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initalized");
};

initDB();


app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`);
});