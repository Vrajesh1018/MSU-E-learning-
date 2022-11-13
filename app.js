require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const path = require("path");
const courses = require("./Content/courses.js");
const https = require("https");

const app = express();

var isAuthenticate = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "public/views"));

app.use(express.static("public"));






// Home route
app.get("/", (req, res) => {
  console.log(__dirname);
  //res.sendFile(__dirname + "/index.html");

  // console.log(__dirname);
  //res.sendFile(__dirname + "/index.html");

  //console.log(courses);

  if (isAuthenticate)
    res.render("login", {});
  else
    res.render("home", {});



  //console.log(req);

  //console.log(req.body.createAccount);
});


app.post("/", (request, response) => {
  const email = request.body.emailSignIn;
  const pass = request.body.passSignIn;

  //console.log(request.body);

  axios
    .post("http://localhost:4000/api/foundOne", {
      email: request.body.emailSignIn,
      pass: request.body.passSignIn,
    })

    .then((res) => {
      console.log("I am from response SignIn");
      console.log(res.data);
      isAuthenticate = res.data;

      if (isAuthenticate) {
        response.render("login", {});
        // response.redirect("/");
      } else {
        response.render("home", {});
        response.send("Authetication failled !!!");
      }
    })

    .catch((err) => {
      console.log("I am from catch");
      console.log(err);
    });
});




// My Profile route
app.get("/myprofile", (req, res) => {

  if (isAuthenticate) {

    res.render("dashboard", {});
    // res.send("My Profile .html banav bhai !");
  }
  else
    res.redirect("/")
});



app.get("/logout", (req, res) => {
  isAuthenticate = false;
  res.redirect("/");
});



// Register Route
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});



app.post("/register", (req, res) => {
  console.log("Hii I Am in /register post ..");
  console.log(req.body.registerPrn);

  //console.log(req.body);

  axios
    .post("http://localhost:4000/api", {
      prn: req.body.registerPrn,
      mail: req.body.registerEmail,
      password: req.body.registerPassword,
      name: req.body.registerName,
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
// <<<<<<< HEAD
app.get("/courses/:newCourse", (req, res) => {


  var newCourse = req.params.newCourse;
  //    res.sendFile(path);

  var courseDetails;
  console.log("Value of new Course is : " + newCourse);

  courses.forEach((element) => {

    console.log(element.courseName);

    // string1.localeCompare(string2) == if both are equal then returns 0 and if if they are equal then add courses.items to it.
    if (!element.courseName.localeCompare(newCourse))
      courseDetails = element.items;

  });

  //console.log(courseDetails);

  res.render("coursesTemplate", { courseArr: courseDetails, courseName: newCourse });

});



//Particular course Dashboard
app.get("/courses/:newCourse/pcourse/:itemId/student/:courseId", (req, res) => {


  var courseName = req.params.newCourse;
  var courseId = req.params.courseId;
  var itemId = req.params.itemId;

  var jsonObjectBody = "";


  var playlistId = ""

  courses.forEach((ele) => {

    // This means we find the object of particular course ex. CSE.
    if (!ele.courseName.localeCompare(courseName)) {

      ele.items.forEach((e) => {


        // That means we got is it of which domain
        if (e.itemid == itemId) {

          e.cardlist.forEach((element) => {

            if (element.cardId == courseId) {

              // here we get the exact object of carList which contain details;
              playlistId = element.playlistId;

              console.log(element);
            }

          })

        }


      });



    }

  });


  //console.log(playlistId);

  var playlistURL = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=" + playlistId + "&key=" + process.env.API_KEY;


  https.get(playlistURL, (response) => {

    //Intialise our JSON object 
     jsonObjectBody = "";


    response.on("data", (chunk) => {
      jsonObjectBody += chunk;
    });


    response.on("end", () => {
      var jsonObject = JSON.parse(jsonObjectBody);

      // It's working correctly 
      // console.log(jsonObject);


      // If no of videos are more than 50 then the YT api will provide it in no Of pages so to navigate throgh next page we requied nextPageToken ..
      var nextPageToken = jsonObject.nextPageToken;

      var itemLength = jsonObject.items.length;

      // console.log(itemLength);

      for (var i = 0; i < itemLength; i++) {
        //console.log(jsonObject.items[i].snippet.title);
      }


      res.render("Pcourse", { itemsArray: jsonObject.items });

    });

  });

});




// Route for video play 
app.post("/video", (req, res) => {
  //console.log(req.body);

  var iframeHtml = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/` + req.body.extra_submit_param + `"
  title="YouTube video player" frameborder="0"
  allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>`;


  res.send(iframeHtml);


});


app.listen(3000, () => {
  console.log("server has started on port 3000");
});
