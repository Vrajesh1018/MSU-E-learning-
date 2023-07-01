const router = require('express').Router();
const axios = require("axios");
// var isAutheticate = false;



// function setAuthenticate(param){
//     isAutheticate = param;
//     return isAuthenticate;
// }



// setAuthenticate(false);

// Home route
router.get("/", (req, res) => {
    console.log(req.session);

  if(req.session.isAuthenticate)
  console.log("Hii isAuthenticate is false");

  // if (isAuthenticate) res.render("login", {});
  // else res.render("home", {});

  if(req.session.isAuthenticate)
  res.render("login");
  else
  res.render("home");


});

router.post("/", (request, response) => {
    const email = request.body.emailSignIn;
    const pass = request.body.passSignIn;
  
    request.session.usermail = request.body.emailSignIn;
  
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
        
        request.session.isAuthenticate = res.data;
  
        console.log(request.session);
  
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


module.exports = router;
