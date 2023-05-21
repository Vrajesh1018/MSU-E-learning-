require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const path = require("path");
const courses = require("./Content/courses.js");
const https = require("https");




const app = express();

//******** ************** passport Authentication ************* */

/*

const {passport,Student} = require("./middleware/authentication");


app.use(session({
  secret: "our little secret.",
  resave: false,
  saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

*/

// **********************************************************************8


var isAuthenticate = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "public/views"));

app.use(express.static("public"));

var CURRENTPLAYLISTID = "";


var USERMAIL = "";  // when user registered in course then add details of that course to that particular student in database we need this 

/////////////////////////// Routes Separation /////////////////////////////////////////////

/// Importing all routes



// const homeRoute = require("./Routes/Home");
// const myprofileRoute = require("./Routes/Myprofile");
// const registerRoute = require("./Routes/Register");
// const pcourseRoute = require("./Routes/Pcourse");
// const videoRoute = require("./Routes/Video");
// const courseRoute = require("./Routes/Course");


// middleware
app.use(express.json());

// app.use("/",homeRoute.router);
// app.use("/courses/",courseRoute);
// app.use("/myprofile",myprofileRoute);
// app.use("/courses/:newCourse/pcourse/:itemId/student/:courseId",pcourseRoute);
// app.use("/register",registerRoute);
// app.use("/video",videoRoute);



///////////////////////////////////////////////////////////////////////////////////////////////////



// Home route
app.get("/", (req, res) => {
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


///////////////////////////


// My Profile route get request
app.get("/myprofile", (req, response) => {

  let userCourseDetails = "";


  if (isAuthenticate) {
    console.log(USERMAIL);

    axios
      .post("http://localhost:4000/api/course/foundOne", {
        mail: USERMAIL,
      })

      .then((res) => {

        userCourseDetails = res.data.Courses;

        response.render("dashboard", { courseArr: userCourseDetails, totalBranches: courses.length });

      })
      .catch((err) => {
        console.log("I am from catch");
        console.log(err);
      });
  } else response.redirect("/");
});

// when user take out from the course then it make post request to the /myprofile route
app.post("/myprofile", (req, response) => {

  //console.log("I am from post request of /myprofile");
  //console.log(req.body);

  axios.post("http://localhost:4000/api/course/removeCourse", {
    mail: USERMAIL,
    cardId: req.body.extra_submit_param_cardId,
    itemId: req.body.extra_submit_param_itemId
  })

    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  // Again redirect back to /myprofile so it's work like refresh the page and course has been removed.
  response.redirect("/myprofile");
});

app.get("/logout", (req, res) => {
  isAuthenticate = false;
  res.redirect("/");
});


// Register Route
app.get("/register", (req, res) => {

  res.render("register");
  //res.sendFile(__dirname + "/register.html");
});


app.post("/register", (req, res) => {
  console.log("Hii I Am in /register post ..");
  console.log(req.body.registerPrn);

  //console.log(req.body);

  USERMAIL = req.body.registerEmail;

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

      isAuthenticate = true;   //check 123...

      // res.redirect("/");
      res.render("login");

    })
    .catch(function (error) {
      console.log("I am from catch /api");
      console.log(error);
    });

});

// Courses Route get request
app.get("/courses/:newCourse", (req, res) => {
  if (isAuthenticate) {

    let newCourse = req.params.newCourse;
    //    res.sendFile(path);

    let courseDetails;
    console.log("Value of new Course is : " + newCourse);

    courses.forEach((element) => {
      //console.log(element.courseName);

      // string1.localeCompare(string2) == if both are equal then returns 0 and if if they are equal then add courses.items to it.
      if (!element.courseName.localeCompare(newCourse))
        courseDetails = element.items;
    });

    res.render("coursesTemplate", {
      courseArr: courseDetails,
      courseName: newCourse,
    });

  }


  else {
    res.redirect("/");
  }
});

// course Route post request when user registerd for course
app.post("/courses/:newCourse", (req, res) => {
  let courseName = req.params.newCourse;

  // console.log(req.body);

  let itemid = req.body.extra_submit_param_itemid;
  let cardId = req.body.extra_submit_param_cardId;
  let carTitle = req.body.extra_submit_param_cardTitle;
  let imgurl = req.body.extra_submit_param_imgurl;
  let author = req.body.extra_submit_param_author;

  console.log("value of user mail is : " + USERMAIL);

  console.log(itemid);
  console.log(cardId);

  axios
    .post("http://localhost:4000/api/course", {
      courseName: courseName,
      itemid: itemid,
      cardId: cardId,
      mail: USERMAIL,
      cardTitle: carTitle,
      imgurl: imgurl,
      author: author,
    })
    .then(function (response) {
      //console.log("from I am from axios post");
      //console.log(response);
    })
    .catch(function (err) {
      console.log("I am from catch /api");
      console.log(err);
    });

    let videoUrl = "/courses/"+courseName+"/pcourse/"+itemid+"/student/"+cardId;

  res.redirect(videoUrl);
});




//Particular course Dashboard
app.get("/courses/:newCourse/pcourse/:itemId/student/:courseId", (req, res) => {
  let courseName = req.params.newCourse;
  let itemId = req.params.itemId;
  let courseId = req.params.courseId; // courseId === cardId

  let jsonObjectBody = "";

  let playlistId = "";

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

              CURRENTPLAYLISTID = playlistId;

              console.log(element);
            }
          });
        }
      });
    }
  });

  let playlistURL =
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
      let jsonObject = JSON.parse(jsonObjectBody);

      // If no of videos are more than 50 then the YT api will provide it in no Of pages so to navigate throgh next page we requied nextPageToken ..
      let nextPageToken = jsonObject.nextPageToken;

      let itemLength = jsonObject.items.length;

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
app.post("/courses/:newCourse/pcourse/:itemId/student/:courseId", (req, res) => {
  console.log(req.body);


    let videoId = req.body.extra_submit_param_videoId;
    let courseName = req.body.extra_submit_param_courseName;
    let courseId = req.body.extra_submit_param_courseId;

    let itemId = req.params.itemId;

    console.log("video ID : " + videoId);
    console.log("Item ID : " + itemId);
    console.log("courseName ID : " + courseName);


    let playlistURL =
      "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=" +
      CURRENTPLAYLISTID +
      "&key=" +
      process.env.API_KEY;


    console.log(CURRENTPLAYLISTID);


    https.get(playlistURL, (response) => {
      //Intialise our JSON object
      jsonObjectBody = "";

      response.on("data", (chunk) => {
        jsonObjectBody += chunk;
      });

      response.on("end", () => {
        let jsonObject = JSON.parse(jsonObjectBody);

        // It's working correctly
        // console.log(jsonObject.items);

        // If no of videos are more than 50 then the YT api will provide it in no Of pages so to navigate throgh next page we requied nextPageToken ..
        let nextPageToken = jsonObject.nextPageToken;

        let itemLength = jsonObject.items.length;

        // console.log(itemLength);

        for (let i = 0; i < itemLength; i++) {
          // if(jsonObject.items[i].snippet.resourceId.videoId==videoId)
          //console.log(jsonObject.items[i].snippet.title);
        }


        res.render("Pcourse", {
          videoId: videoId,
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

// });



app.listen(3000, () => {
  console.log("server has started on port 3000");
});
