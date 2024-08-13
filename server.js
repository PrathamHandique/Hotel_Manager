const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config(); //import dotenv

const bodyParser = require("body-parser"); //import body-parser
app.use(bodyParser.json()); //use body-parser
const  passport = require("./auth");//import passport


const logRequest = (req, res, next) => {//middelware function
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};
app.use(logRequest);
app.use(passport.initialize()); //initialize passport
const localAuthMiddleware = passport.authenticate("local", { session: false });


app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Hello World");
});


const personRoutes = require("./routes/personRoutes"); //import router files
app.use("/person", localAuthMiddleware,personRoutes); //use the router
const PORT = process.env.PORT || 3000; //listen on port


app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});
