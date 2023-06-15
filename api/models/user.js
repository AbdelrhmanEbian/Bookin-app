const mongoose=require('mongoose')

const user =new mongoose.Schema({
    name:{require:true,type:String},
    email:{require:true,unique:true,type:String},
    password:{require:true,type:String}
})
module.exports=mongoose.model("users",user)