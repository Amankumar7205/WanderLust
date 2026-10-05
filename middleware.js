 const Listing=require("./models/listing")
 const Review=require("./models/review")
 const { listingsSchema,reviewSchema } = require("./schema");

 module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create Listing")
        return res.redirect("/login");
    }
    next();
 }
 module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
 }
 module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.curruser._id)){
        req.flash("error","you don't have permmission")
        return res.redirect(`/listing/${id}`);
    }
    else{
        next();
    }


 }
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingsSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}
module.exports.validateReviews=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=errorMonitor.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}