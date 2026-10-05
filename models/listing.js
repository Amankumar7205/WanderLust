const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const review = require("./review.js");

const listing_Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://tse1.mm.bing.net/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?pid=Api&P=0&h=220",
    },
  },

  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    }
    ,
    geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

});
listing_Schema.post("findOneAndDelete",async(listings)=>{
  if(listings){
    await Review.deleteMany({_id:{$in: listings.reviews}});

  }
});
const Listing = mongoose.model("Listing", listing_Schema);
module.exports = Listing;
