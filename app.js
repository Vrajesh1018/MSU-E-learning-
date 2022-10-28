
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require('axios').default;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));




// Home route
app.get("/", (req, res) => {

   // console.log(__dirname);
    res.sendFile(__dirname + "/index.html");

    //console.log(req);

    console.log(req.body.createAccount);
});


// Register Route
app.get("/register", (req, res) => {


    res.sendFile(__dirname + "/register.html");


});

app.post("/register", (req, res) => {

    console.log("Hii I Am in /register post ..");
    console.log(req.body.registerPrn);

    //console.log(req.body);

    

    axios.post('http://localhost:4000/api', {
        prn: req.body.registerPrn,
        mail: req.body.registerEmail,
        password: req.body.registerPassword,
        name: req.body.registerName
    })
        .then(function (response) {
            // console.log(response);
            console.log("JSON OBJECT send sucessfully to api ");
        })
        .catch(function (error) {
            console.log(error);
        });



    res.redirect("/");

});


// Courses Route
app.get("/courses/:newCourse",(req,res)=>{


    console.log(req.params.newCourse);
    console.log(__dirname);

    var newCourse = req.params.newCourse;
    var path = __dirname + "/public/courses/" + newCourse + ".html"; 

    console.log(path);
    res.sendFile(path);
    //res.send(req.params.newCourse);




});



app.listen(3000, () => {

    console.log("server has started on port 3000");
});