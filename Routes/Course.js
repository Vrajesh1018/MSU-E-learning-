const router = require('express').Router();

var isAuthenticate = require("./Home").isAuthenticate;


router.use(function(req,res,next){

  console.log(req.url);
  console.log(isAuthenticate);
  next();
  
});

console.log("I am from courseRoute " + isAuthenticate);

// Courses Route get request
router.route("/:newCourse")
   

  .get((req, res) => {
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


})

// course Route post request when user registerd for course
.post((req, res) => {

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



module.exports = router;
