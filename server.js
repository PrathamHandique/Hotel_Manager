const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
//import router files
const personRoutes = require("./routes/personRoutes");
//use the router 
app.use('/person',personRoutes);
//listen on port 3000
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
