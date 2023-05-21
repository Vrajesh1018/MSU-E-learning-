const router = require('express').Router(); 

// const axios = require("axios");
// const passport = require('passport');
// const Student = require("../controller/studentController");

const {passport,Student} = require("../middleware/authentication");

// Register Route

router.get("/", (req, res) => {

  if(req.isAuthenticated()){
    res.render("login",{});
  }
  else{
    res.render("home",{});

  }

  // if (isAuthenticate) res.render("login", {});
  // else res.render("home", {});
});

router.post("/", (request, response) => {
  const email = request.body.emailSignIn;
  const password = request.body.passSignIn;

  USERMAIL = request.body.emailSignIn;

  
  Student.register({Email:email},password,function(err,student){
    if(err){
      response.redirect("/");
    }
    else{

      passport.authenticate("local")(req,res,function(){
        res.redirect("/");
      });

    }
  })



  /*
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

    */
});

module.exports = router;

