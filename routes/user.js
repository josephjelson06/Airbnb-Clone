const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
// const listingController = require("../controllers/listings.js")
const listingController = require("../controllers/listing.js")
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
        userController.login
    );
router.get("/", listingController.index);
router.get("/logout", userController.logout);

module.exports = router;