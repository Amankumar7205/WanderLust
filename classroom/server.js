const express=require("express");
const app =express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionoptions={
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}
app.use(session(sessionoptions));
app.use(flash());
app.use((req,res,next)=>{
     res.locals.successmsg=req.flash("success");
     res.locals.errormsg=req.flash("error");
     next();
})

app.get("/register",(req,res)=>{
    let {name="bekar"}=req.query;
    req.session.name=name;
    if(name==="bekar"){
         req.flash("error","user  not regiterd successfully");
    }
    else{
         req.flash("success","user regiterd successfully");
    }
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
})
app.get("/test",(req,res)=>{
    res.send("test successful");
})
app.listen(3000,()=>{
    console.log("server started");
})
