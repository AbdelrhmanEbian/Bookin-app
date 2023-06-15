const express=require('express')
const router=express.Router()
const {register,login, profile,logout}=require('../controllers/user')
router.post('/register',register)
router.post('/login',login)
router.post('/profile',profile)
router.post('/logout',logout)
module.exports=router