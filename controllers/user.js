const User = require("../models/user.js");

module.exports.renderSignUp=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust");
            return res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }

};


module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};


module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    if (res.locals.redirectUrl)
        return res.redirect(res.locals.redirectUrl);
    else
        return res.redirect("/listings");
};


module.exports.logOut=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        return res.redirect("/listings");
    })
};