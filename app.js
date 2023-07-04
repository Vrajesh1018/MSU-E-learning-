require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const path = require("path");
const courses = require("./Content/courses.js");
const https = require("https");
const session = require("express-session");
// const passport = require("passport");



const app = express();

const {passport,Student} = require("./middleware/authentication");


app.use(session({
  secret: "our little secret.",
  resave: false,
  saveUninitialized: false,
  isAuthenticate:false,
  usermail:"",
  currentplaylistid:""
}));

app.use(passport.initialize());
app.use(passport.session());


var isAuthenticate = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "public/views"));

app.use(express.static("public"));

var CURRENTPLAYLISTID = "";


var USERMAIL = "";  // when user registered in course then add details of that course to that particular student in database we need this 

/////////////////////////// Routes Separation /////////////////////////////////////////////

/// Importing all routes



const homeRoute = require("./Routes/Home");
const myprofileRoute = require("./Routes/Myprofile");
const registerRoute = require("./Routes/Register");
const courseRoute = require("./Routes/Course");
const logoutRoute = require("./Routes/Logout");


// middleware
app.use(express.json());


app.use("/",homeRoute);
app.use("/courses/",courseRoute);
app.use("/myprofile",myprofileRoute);
app.use("/register",registerRoute);
app.use("/logout",logoutRoute);

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
