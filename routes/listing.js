const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingsSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js")
const upload = multer({storage })


//new route
router.get("/new",isLoggedIn,(listingController.new));

//all listing route
router.get("/",wrapAsync(listingController.index));


//show route
router.get("/:id", wrapAsync(listingController.show));

//create route
router.post("/",isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.create))

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));
//updateroute
router.put("/:id" ,isLoggedIn,isOwner,validateListing,upload.single("listing[image]"),wrapAsync(listingController.update))

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));
module.exports=router;
