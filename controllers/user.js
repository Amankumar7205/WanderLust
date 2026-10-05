const User=require("../models/user")
//signup-form

module.exports.signup_form=(req,res)=>{
    res.render("users/signup.ejs");
};

//signup
module.exports.signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
         req.flash("success"," welcome to Wanderlust !");
          res.redirect("/listing");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }   
};

//login form
module.exports.login_form=(req,res)=>{
    res.render("users/login.ejs");
};

//login
module.exports.login= async(req,res)=>{
        req.flash("success","welcome to Wanderlust!");
        let redirectUrl=res.locals.redirectUrl|| "/listing";
        res.redirect(redirectUrl);

};
//logout
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","you are logout!");
        res.redirect("/listing");

    })
};