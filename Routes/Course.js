const router = require('express').Router();
const courses = require("../Content/courses.js");
const axios = require("axios");
const https = require('https');

// Courses Route get request
router.route("/:newCourse")
   

  .get((req, res) => {
    if(req.session.isAuthenticate){

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

  //console.log("value of user mail is : " + USERMAIL);

  console.log(itemid);
  console.log(cardId);

  console.log(req.session.usermail);

  axios
    .post("http://localhost:4000/api/course", {
      courseName: courseName,
      itemid: itemid,
      cardId: cardId,
      mail: req.session.usermail,
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


router.route("/:newCourse/pcourse/:itemId/student/:courseId")

.get((req,res)=>{

  if(req.session.isAuthenticate){

  let courseName = req.params.newCourse;
    let itemId = req.params.itemId;
    let courseId = req.params.courseId; // courseId === cardId
  // console.log(req.body);
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
  
                // console.log(element);
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

  }
  else{
    res.redirect("/");
  
  }

})

.post((req,res)=>{

  if(req.session.isAuthenticate){
  let videoId = req.body.extra_submit_param_videoId;
  let courseName = req.body.extra_submit_param_courseName;
  let courseId = req.body.extra_submit_param_courseId;
  let itemId = req.params.itemId;

  let playlistURL =
    "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=" +
    CURRENTPLAYLISTID +
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
        videoId: videoId,
        itemsArray: jsonObject.items,
        courseName: courseName,
        courseId: courseId,
        itemId: itemId,
      });

    });
  });

}
else{
  res.redirect("/");
}


});




module.exports = router;
