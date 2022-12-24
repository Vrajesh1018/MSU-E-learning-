const router = require('express').Router(); 


var isAuthenticate = require("./Home").isAuthenticate;

// Route for video play
router.post("/", (req, res) => {
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



module.exports = router;