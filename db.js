const mongoose = require("mongoose");
require("dotenv").config();

//const mongoURL = process.env.MONGODB_URL_LOCAL;

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);
// useNewUrlParser: true,
// useUnifiedTopology: true

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
db.on("error", () => {
  console.log("MongoDB connection failed");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
module.exports = db;
