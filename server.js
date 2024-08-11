const express = require("express");
const app = express();
const db = require("./db");
//import dotenv
require('dotenv').config();
//import body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
//import router files
const personRoutes = require("./routes/personRoutes");
//use the router 
app.use('/person',personRoutes);
//listen on port 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});
