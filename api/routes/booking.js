const express=require('express')
const {createbooking , getsinglebooking,getallbookings} = require('../controllers/booking')

const router=express.Router()

router.post('/create',createbooking)
router.post('/allbookings',getallbookings)
router.post('/:id',getsinglebooking)
module.exports=router