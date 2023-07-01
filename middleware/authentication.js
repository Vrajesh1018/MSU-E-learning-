 const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const studentSchema = require("../models/studentModel");
// const Student = require("../controller/studentController");
const mongoose = require("mongoose");

const findOrCreate = require('mongoose-findorcreate')



const Student = mongoose.model("student", studentSchema);

mongoose.connect("mongodb://127.0.0.1:27017/student");




studentSchema.plugin(passportLocalMongoose);

// passport.use(Student.createStrategy());


// used to serialize the user for the session
passport.serializeUser(function(student, done) {
    done(null, student.id); 
   
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, student) {
        done(err, student);
    });
});

module.exports = {
    passport,
    Student
}
