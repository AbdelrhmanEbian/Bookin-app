const mongoose=require('mongoose')

const places =mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extra:String,
    checkin:Number,
    checkout:Number,
    price:Number,
    guests:Number
})

module.exports=mongoose.model('places',places)