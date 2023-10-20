const express=require("express")
const User= require('../models/userModel')
const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:"1d",
    })
}




module.exports.Register =async(req,res)=>{
const {name,email,password,pic}=req.body;

if(!name || !email || !password){
    res.status(400);
    throw new Error("Please Enter all the Fields");
}
try{
const userExists =await User.findOne({email});
  
if(userExists){
    res.status(400);
    throw new Error("User already exists");
}

const user= await User.create({name,email,password,pic})

if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id),
    })
}
else {
    res.status(400);
    throw new Error("Failed to Create the User");
}}

catch(err)
{
    res.json({err});
}



}


module.exports.Login=async(req,res)=>{

    const{email,password}=req.body;

    try{
        const user = await User.Login(email, password);
         
        if(user){
            res.json({_id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                isAdmin:user.isAdmin,
                token:generateToken(user._id),})
        }}

        catch(err)
        {   console.log("this is mmy errir",err);
            res.json(err);
        }
    }


// api/user?search=sachin

    module.exports.allUsers=async(req,res)=>{
        const keyboard=req.query.search ?{
            $or : [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
              ],
        }
      
        // console.log(keyboard);
           :{}

           const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.send(users);

    }
