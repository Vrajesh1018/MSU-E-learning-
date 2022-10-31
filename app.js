
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require('axios').default;
const path = require("path");

// const ejs = require("ejs");


const app = express();

var isAuthenticate = false;


app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine","ejs");

app.set('views', path.join(__dirname, 'public/views'))


app.use(express.static("public"));





// Home route
app.get("/", (req, res) => {

     console.log(__dirname);
    //res.sendFile(__dirname + "/index.html");

    res.render("home",{});


    //console.log(req);

    //console.log(req.body.createAccount);
});

app.post("/", (request, response) => {

    const email = request.body.emailSignIn;
    const pass = request.body.passSignIn;

    //console.log(request.body);



    axios.post("http://localhost:4000/api/foundOne", {
        email: request.body.emailSignIn,
        pass: request.body.passSignIn
    })

        .then((res) => {
            console.log("I am from response SignIn");
            console.log(res.data);
            isAuthenticate = res.data;


            if (isAuthenticate){

                response.render("login",{});
                // response.redirect("/");
            }
            else{

                response.render("home",{});
                response.send("Authetication failled !!!");
            }


        })

        .catch((err) => {
            console.log("I am from catch");
            console.log(err);
        });
});



// My Profile route
app.get("/myprofile",(req,res)=>{

    if(isAuthenticate)
    res.send("My Profile .html banav bhai !");
    else
    res.redirect("/")
});


app.get("/logout",(req,res)=>{
    isAuthenticate = false;
    res.redirect("/");
})


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

            console.log("I am from catch /api");
            console.log(error);

        });



    res.redirect("/");

});


// Courses Route
app.get("/courses/:newCourse", (req, res) => {


    //console.log(req.params.newCourse);
    //console.log(__dirname);

    var newCourse = req.params.newCourse;
    var path = __dirname + "/public/courses/" + newCourse + ".html";

    //console.log(path);
    res.sendFile(path);
    //res.send(req.params.newCourse);




});



app.listen(3000, () => {

    console.log("server has started on port 3000");
});