const Review=require("../models/review");
const Listing=require("../models/listing")
//create
module.exports.create=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let new_review=new Review(req.body.review);
    new_review.author=req.user._id;
    console.log(new_review);
    listing.reviews.push(new_review);
    await new_review.save();
    await listing.save();
    req.flash("success","New Review Created !");
    res.redirect(`/listing/${listing._id}`);
};

//delete
module.exports.delete=async(req,res)=>{
    let {id ,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}})
  await  Review.findByIdAndDelete(reviewId);
   req.flash("success","Review deleted !");
    res.redirect(`/listing/${id}`);

};