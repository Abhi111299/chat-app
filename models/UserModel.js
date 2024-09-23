const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength: [30, "Name can not exceed 30 characters"],
        minLength: [4, "Name should be more than 5 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        maxLength:[20, "Password can not exceed more than 20 characters"],
        minLength: [8, "Password should be 8 characters"],
        select: false
    },
    image:{
        type:String,
        required:true
    },
    is_online:{
        type:String,
        default:'0'
    }
},
{ timestamps : true}
);

module.exports = mongoose.model("User", userSchema);