const express= require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
require("./db/mongo");
const Register=require("./models/registers");
const port= process.env.PORT || 3000;
const { json }=require("express");
const static_path=path.join(__dirname, "../public");
const template_path=path.join(__dirname, "../templates/views");
const partials_path=path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/response",(req,res)=>{
    res.render("response");
})

app.get("/",(req, res) => {
    res.render("index")
});

app.get("/login", (req, res)=>{
    res.render("login");
})

app.post("/login",async (req, res)=>{
    try{
       const username=req.body.username;
       const password=req.body.password;

     const userusername=await Register.findOne({username:username});
     
     if(userusername.password===password){
        res.status(201).render("response");
     }else{
        res.send("wrong credentials");
     }

    }catch(error){
      res.status(400).send(invalid);
    }
})

app.get("/register", (req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
    try{
       const password=req.body.password;
       const confirmpassword=req.body.confirmpassword;
       
       if(password===confirmpassword){
        const registerGamer=new Register({
            emailid:req.body.emailid,
            username:req.body.username,
            password:password,
            confirmpassword:confirmpassword,
            phone:req.body.phone

        })

        const registered=await registerGamer.save();
        res.status(201).render("login");
       }else{
        res.send("invalid password")
       }
     }catch(error){
       res.status(400).send(error);
     }    
})

app.listen(port, () => {
    console.log(`sever is running on port no ${port}`);
})
