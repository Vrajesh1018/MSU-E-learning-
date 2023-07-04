const router = require('express').Router();

router.get("/",(req,res)=>{
    req.session.isAuthenticate=false;
    res.redirect("/");
});

module.exports = router;