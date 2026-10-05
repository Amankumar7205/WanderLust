const Listing=require("../models/listing")
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
let geocodingClient;
try {
    if (mapToken && mapToken !== "your_mapbox_token") {
        geocodingClient = mbxGeocoding({ accessToken: mapToken });
    }
} catch (err) {
    console.log("Mapbox initialization skipped:", err.message);
}
//new
module.exports.new=(req,res)=>{
    res.render("listings/new.ejs")
};

//all lisiting
module.exports.index=async(req,res)=>{
   const alllistings = await Listing.find({})
   res.render("listings/index.ejs",{alllistings})
};

// show
module.exports.show=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
         req.flash("error","Listing cannot found !");
         res.redirect("/listing")
    }
    else{
         res.render("listings/show.ejs",{listing})
    }
};
// create
module.exports.create=(async (req,res,next)=>{
  let response;
  if (geocodingClient) {
    response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    }).send();
  } else {
    response = { body: { features: [{ geometry: { type: "Point", coordinates: [77.2090, 28.6139] } }] } };
  }
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url ,".." ,filename)
    const newlisting=new Listing(req.body.listing) ;
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry;
    await newlisting.save();
    req.flash("success","New Listing Created !");
   res.redirect("/listing");
});

//edit
module.exports.edit=async(req,res)=>{
     let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
         req.flash("error","Listing cannot found !");
         res.redirect("/listing")
    }
    else{
         res.render("listings/edit.ejs",{listing});
    }
};
//delete
module.exports.delete=async(req,res)=>{
    let {id}=req.params;
   console.log(await Listing.findByIdAndDelete(id));
   req.flash("success","Listing deleted!");
    res.redirect("/listing")
};

//update
module.exports.update=async(req,res)=>{
    let {id}=req.params;
  let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file!== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();

  }
  req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
}