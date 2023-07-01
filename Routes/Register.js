const router = require('express').Router(); 
const axios = require('axios');

// Register Route
router.get("/", (req, res) => {

  // if(req.isAuthenticated){
  //   res.render("login",{});
  // }
  // else{
  //   res.render("home",{});

  // }

  if (req.session.isAuthenticate) 
  res.render("login", {});
  else res.render("register", {});

  // res.render("register");
});

router.post("/", (request, response) => {

  request.session.usermail=request.body.registerEmail;

  axios
    .post("http://localhost:4000/api", {
      prn: request.body.registerPrn,
      mail: request.body.registerEmail,
      password: request.body.registerPassword,
      name: request.body.registerName,
    })
    .then(function (res) {
      // console.log(response);
      console.log("JSON OBJECT send sucessfully to api ");

      isAuthenticate = true;   //check 123...

      request.session.isAuthenticate=false;
      
      // res.redirect("/");
      response.render("login");

    })
    .catch(function (error) {
      console.log("I am from catch /api");
      console.log(error);
    });
});

module.exports = router;

