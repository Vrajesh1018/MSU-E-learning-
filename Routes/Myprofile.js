const router = require('express').Router(); 
const axios = require('axios');
const courses = require("../Content/courses.js");


// My Profile route get request
router.get("/", (req, response) => {
  let userCourseDetails = "";

    if(req.session.isAuthenticate){
   
    console.log("USER mail from session is : "+req.session.usermail);

    axios
      .post("http://localhost:4000/api/course/foundOne", {
        mail: req.session.usermail,
      })

      .then((res) => {

        userCourseDetails = res.data.Courses;

        console.log(userCourseDetails);

        response.render("dashboard", { courseArr: userCourseDetails, totalBranches: courses.length });

      })
      .catch((err) => {
        console.log("I am from catch");
        console.log(err);
      });
  } else response.redirect("/");
});


//when user take out from the course then it make post request to the / route
router.post("/", (req, response) => {

  console.log(req.session.usermail);
  axios.post("http://localhost:4000/api/course/removeCourse", {
    mail: req.session.usermail,
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


module.exports = router;