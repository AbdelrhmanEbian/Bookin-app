const express=require('express')
require('dotenv').config()
const cors=require('cors')
const cookie=require('cookie-parser')
const  connect  = require('./db/connect')
const authrouter=require('./routes/user')
const places=require('./routes/places')
const book=require('./routes/booking')
const uploader=require('express-fileupload')
const app =express()
app.use(uploader())
// middleware
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
const corsOptions = {
origin: 'https://abdelrhmanebian.github.io',
    credentials: true, // Allow sending credentials
  }
  app.use(cors(corsOptions))
  app.use(cookie())
  app.use('/auth',authrouter)
  app.use('/places',places)
  app.use('/booking',book)
const start=async()=>{
    try {
        await connect(process.env.MONGO)
        app.listen(3000,console.log('running on port 3000'))
    } catch (error) {
        console.log(error);
    }
}
start()
