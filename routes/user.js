const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignUp)
.post(wrapAsync(userController.signUp));


// router.get("/signup", userController.renderSignUp);


// router.post("/signup", wrapAsync(userController.signUp));

router.route("/login")
.get( userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);

// router.get("/login", userController.renderLoginForm);

// router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);

router.get("/logout", userController.logOut);

module.exports = router;