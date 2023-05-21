const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    PRN: Number,
    Email: String,
    Password: String,
    Name: String,
    Courses: [{
        courseName: String,
        itemId: String,
        cardId: String,
        cardTitle: String,
        imgurl: String,
        author: String

    }]
});

module.exports = studentSchema;