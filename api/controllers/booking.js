const Booking =require('../models/book')
const createbooking=async(req,res)=>{
     const data=await Booking.create(req.body)
    res.status(200).json(data)
}
const getallbookings=async(req,res)=>{
const id =req.body.user._id
    const data =await Booking.find({user:id}).populate('place')
    res.status(200).json(data)
}
const getsinglebooking=async(req,res)=>{
    const  {user} =req.body
    const bookingid=req.params.id
    const data =await Booking.findOne({user,_id:bookingid}).populate('place')
    res.status(200).json(data)
}
module.exports={createbooking,getallbookings,getsinglebooking}