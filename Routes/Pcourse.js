const router = require('express').Router(); 
var isAuthenticate = require("./Home").isAuthenticate;


//Particular course Dashboard
router.get("/", (req, res) => {
    let courseName = req.params.newCourse;
    let itemId = req.params.itemId;
    let courseId = req.params.courseId;     // courseId === cardId

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



module.exports = router;