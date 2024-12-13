const mongoose=require("mongoose");

const gameSchema=new mongoose.Schema({
    emailid:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    }
})



const Register=new mongoose.model("Register",gameSchema);
module.exports=Register;