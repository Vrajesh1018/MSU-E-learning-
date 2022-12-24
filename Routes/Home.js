const router = require('express').Router();
const axios = require("axios");
var isAuthenticateHome = false;

// Home route
router.get("/", (req, res) => {
    console.log(__dirname);

    if (isAuthenticateHome) res.render("login", {});
    else res.render("home", {});

});

router.post("/", (request, response) => {
    const email = request.body.emailSignIn;
    const pass = request.body.passSignIn;


    USERMAIL = request.body.emailSignIn;


    axios
        .post("http://localhost:4000/api/foundOne", {
            email: request.body.emailSignIn,
            pass: request.body.passSignIn,
        })

        .then((res) => {
            console.log("I am from response SignIn");
            console.log(res.data);
            isAuthenticateHome = res.data;

            console.log("Is authenication done : "+isAuthenticateHome);

            if (isAuthenticateHome) {
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


module.exports = {
    router: router,
    isAuthenticate: isAuthenticateHome
}