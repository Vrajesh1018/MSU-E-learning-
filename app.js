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



var USERMAIL = "";  // when user registered in course then add details of that course to that particular student in database we need this 


// Home route
app.get("/", (req, res) => {
  console.log(__dirname);

  if (isAuthenticate) res.render("login", {});
  else res.render("home", {});

});

app.post("/", (request, response) => {
  const email = request.body.emailSignIn;
  const pass = request.body.passSignIn;


  USERMAIL = request.body.emailSignIn;


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
app.get("/myprofile", (req, response) => {

  var userCourseDetails="";
 
  
  if (isAuthenticate) {

    console.log(USERMAIL);

    axios.post("http://localhost:4000/api/course/foundOne", {
      mail: USERMAIL
    })

      .then((res) => {

        console.log("myprofile response ");
        //  console.log(res.data.Courses);
        userCourseDetails = res.data.Courses;
        console.log(userCourseDetails);

        response.render("dashboard", {courseArr : userCourseDetails});

      })
      .catch((err) => {
        console.log("I am from catch");
        console.log(err);
      })


  } else res.redirect("/");
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

  //USERMAIL = req.body.registerEmail;


  axios
    .post("http://localhost:4000/api", {
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


// Courses Route get request
app.get("/courses/:newCourse", (req, res) => {
  // if (isAuthenticate) {
  
    var newCourse = req.params.newCourse;
    //    res.sendFile(path);

    var courseDetails;
    console.log("Value of new Course is : " + newCourse);

    courses.forEach((element) => {

      //console.log(element.courseName);

      // string1.localeCompare(string2) == if both are equal then returns 0 and if if they are equal then add courses.items to it.
      if (!element.courseName.localeCompare(newCourse))
        courseDetails = element.items;
    });

    //console.log(courseDetails);

    res.render("coursesTemplate", {
      courseArr: courseDetails,
      courseName: newCourse,
    });
 
    // }


  // else {
  //   res.redirect("/");
  // }


});



// course Route post request when user registerd for course
app.post("/courses/:newCourse", (req, res) => {

  var courseName = req.params.newCourse;


  // console.log(req.body);


  var itemid = req.body.extra_submit_param_itemid;
  var cardId = req.body.extra_submit_param_cardId;
  var carTitle = req.body.extra_submit_param_cardTitle;
  var imgurl = req.body.extra_submit_param_imgurl;
  var author = req.body.extra_submit_param_author;


  console.log("value of user mail is : " + USERMAIL);

  console.log(itemid);
  console.log(cardId);

  axios.post("http://localhost:4000/api/course", {
    courseName: courseName,
    itemid: itemid,
    cardId: cardId,
    mail: USERMAIL,
    cardTitle: carTitle,
    imgurl: imgurl,
    author: author

  }).then(function (response) {

    //console.log("from I am from axios post");
    //console.log(response);

  }).catch(function (err) {
    console.log("I am from catch /api");
    console.log(err);
  })

  res.redirect("/courses/" + courseName);

});






//Particular course Dashboard
app.get("/courses/:newCourse/pcourse/:itemId/student/:courseId", (req, res) => {
  var courseName = req.params.newCourse;
  var itemId = req.params.itemId;
  var courseId = req.params.courseId;     // courseId === cardId

  var jsonObjectBody = "";

  var playlistId = "";

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
          });
        }
      });
    }
  });

  //console.log(playlistId);

  var playlistURL =
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=" +
    playlistId +
    "&key=" +
    process.env.API_KEY;

  https.get(playlistURL, (response) => {
    //Intialise our JSON object
    jsonObjectBody = "";

    response.on("data", (chunk) => {
      jsonObjectBody += chunk;
    });

    response.on("end", () => {
      var jsonObject = JSON.parse(jsonObjectBody);

      // It's working correctly
      // console.log(jsonObject.items[0]);

      // If no of videos are more than 50 then the YT api will provide it in no Of pages so to navigate throgh next page we requied nextPageToken ..
      var nextPageToken = jsonObject.nextPageToken;

      var itemLength = jsonObject.items.length;

      // console.log(itemLength);

      for (var i = 0; i < itemLength; i++) {
        //console.log(jsonObject.items[i].snippet.title);
      }

      res.render("Pcourse", {
        videoId: jsonObject.items[0].snippet.resourceId.videoId,
        itemsArray: jsonObject.items,
        courseName: courseName,
        courseId: courseId,
        itemId: itemId,
      });
    });
  });
});


// Route for video play
app.post("/video", (req, res) => {
  //console.log(req.body);
});

app.post("/courses/:courseId/pcourse/:itemId/student/:courseId", (req, res) => {
  let videoId = req.body.exptra_submit_param_videoId;
  let courseName = req.body.exptra_submit_param_courseName;
  let courseId = req.body.exptra_submit_param_courseId;
  res.render("Pcourse", {
    videoId: videoId,
    itemsArray: jsonObject.items,
    courseName: courseName,
    courseId: courseId,
    itemId: itemId,
  });
});



app.listen(3000, () => {
  console.log("server has started on port 3000");
});
