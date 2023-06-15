const mongoose=require('mongoose')
const User =require('../models/user')
const bcrybt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const register=async(req,res)=>{
 
    try{
        const {name,email,password}=req.body
        const salt=await bcrybt.genSalt(10)
        const hashedpassword=await bcrybt.hash(password,salt)
        const user =await User.create({name,email,password:hashedpassword})
        const token=await jwt.sign({email:email,id:user._id},process.env.TOKEN)
        res.cookie("token",token,{ secure: true, sameSite: 'none'  }).json({success:true})
    }catch(error){
        res.status(422).json(error)
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user =await User.findOne({email})
        const isvalid=await bcrybt.compare(password,user.password)
        if (!isvalid) {
            return res.status(422).json("password is incorrect")
        }
        const token=await jwt.sign({email:email,id:user._id},process.env.TOKEN)
        res.cookie("token",token,{ secure: true, sameSite: 'none'  }).json(user)
    } catch (error) {
        res.status(422).json("no email found")
    }
}
const profile =async(req,res)=>{
    const {token} = req.cookies
    try {
        const decoded =jwt.verify(token,process.env.TOKEN)

        const user=await User.findById(decoded.id)

        res.status(200).json(user)
    } catch (error) {
        res.status(422).json({msg:"please login or register"})
    }
}
const logout=async(req,res)=>{
    res.cookie("token"," ").json(true)
}
module.exports={login,register,logout,profile}
