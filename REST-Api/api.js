
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/student");

const studentSchema = new mongoose.Schema({
    PRN : Number,
    Email : String,
    Password : String,
    Name : String
});

const Student  = mongoose.model("student",studentSchema);


  app.route("/api")

   .get((req,res)=>{

        Student.find({},(err,students)=>{
            if(!err){
                //console.log(students);
                res.send(students);
            }

        });
    })
    .post((req,res)=>{

        //our new uset JSON object is in req.body 
        console.log(req.body);
        var newPRN = req.body.prn;
        var mail = req.body.mail;
        var pass = req.body.password;
        var name = req.body.name;

        // console.log(newPRN);
        // console.log(mail);
        // console.log(pass);
        // console.log(name);

        const newStudent = new Student({
            PRN : newPRN,
            Email : mail,
            Password : pass,
            Name : name
        });



        // This will store data of new student into out mongodb database.
        newStudent.save((err)=>{
            if(!err){
                
                res.send("Data saved !!!");
                console.log("Data saved sucessfully !!!");
            }
            else
            console.log(err);

        });


    });

    app.post("/api/foundOne",(req,res)=>{

        const emailApi = req.body.email;
        const passApi = req.body.pass;

        console.log(req.body);
        var isAuthenticate = false;

        console.log("Hello I am from FoundOne !");

        Student.findOne({Email : emailApi},(err,foundUser)=>{
            if(!err){

                console.log(foundUser);
                if(foundUser.Password === passApi)
                {

                    isAuthenticate = true;
                    //res.send("Hello I am from authetication");
                    res.send(isAuthenticate);
                }
                else{
                    isAuthenticate = false;
                    res.send(isAuthenticate);

                }
            }
        })



    });




app.listen(4000,()=>{
    console.log("Server has started on port 4000 for API");
});

