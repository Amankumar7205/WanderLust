const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingsSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const { isLoggedIn, isReviewAuthor,validateReviews } = require("../middleware.js");
const reviewController=require("../controllers/review.js");
//create review
router.post("/",isLoggedIn,validateReviews,wrapAsync(reviewController.create));

//Delete Review routes
router.delete("/:reviewId",isLoggedIn,wrapAsync(reviewController.delete));
module.exports=router;

