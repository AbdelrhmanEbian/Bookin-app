const mongoose=require('mongoose')

const booking =mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'places'},
    user:{type:mongoose.Schema.Types.ObjectId,required:true},
    name:String,
    phone:String,
    checkin:Date,
    checkout:Date,
    guests:Number,
})
module.exports=mongoose.model('booking',booking)