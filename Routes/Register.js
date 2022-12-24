const router = require('express').Router(); 

const axios = require("axios");

// Register Route
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});


router.post("/", (req, res) => {
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

module.exports = router;

