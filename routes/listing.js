const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner, validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index))
.post(validatelisting,isLoggedIn,upload.single('listing[image][url]'),wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(upload.single('listing[image][url]'),validatelisting,isLoggedIn,isOwner, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


// //index route
// router.get("/", wrapAsync(listingController.index));



// //show route
// router.get("/:id", wrapAsync(listingController.showListing));

// //Create route
// router.post("/", validatelisting,isLoggedIn, wrapAsync(listingController.createListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// //update route
// router.put("/:id", validatelisting,isLoggedIn,isOwner, wrapAsync(listingController.updateListing));

// //delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;