const router = require('express').Router(); 

var isAuthenticate = require("./Home").isAuthenticate;


// My Profile route get request
router.get("/", (req, response) => {

  let userCourseDetails = "";


  if (isAuthenticate) {

    console.log(USERMAIL);

    axios.post("http://localhost:4000/api/course/foundOne", {
      mail: USERMAIL
    })

      .then((res) => {

        userCourseDetails = res.data.Courses;

        response.render("dashboard", { courseArr: userCourseDetails });

      })
      .catch((err) => {
        console.log("I am from catch");
        console.log(err);
      })


  } else response.redirect("/");
});


//when user take out from the course then it make post request to the / route
router.post("/", (req, response) => {

  console.log("I am from post request of /myprofile");
  console.log(req.body);

  axios.post("http://localhost:4000/api/course/removeCourse", {
    mail: USERMAIL,
    cardId: req.body.extra_submit_param_cardId
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