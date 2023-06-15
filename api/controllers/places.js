const Place =require('../models/places')
const addplaces =async(req,res)=>{
    
    try {
        await Place.create(req.body)
        res.status(200).json(true)
    } catch (error) {
        res.status(400)
    }

}
const updateplaces =async(req,res)=>{
    const {id} =req.params
    try {
       const place= await Place.findByIdAndUpdate(id,req.body)
        res.status(200).json(place)
    } catch (error) {
        res.status(400)
    }
    
}
const getuserplaces=async(req,res)=>{
    const place=await Place.find(req.body)
    if (!place) {
        return res.status(400).json('no Accommodations')
    }
    res.status(200).json(place)
}
const getallplaces=async(req,res)=>{
    try{
        res.status(200).json(await Place.find())
    }catch(error){
    
    }
}
module.exports={addplaces,getallplaces,updateplaces,getuserplaces}