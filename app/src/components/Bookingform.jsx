import React ,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {differenceInCalendarDays}from'date-fns'
import axios from 'axios'
import { motion } from 'framer-motion'

function Bookingform({select}) {
    const [checkin,setcheckin]=useState('')
  const [checkout,setcheckout]=useState('')
  const [guests,setguests]=useState(null)
  const [name,setname]=useState('')
  const [phone,setphone]=useState('')
  const [error,seterror]=useState(null)
  const nav = useNavigate();
  const { id } = useParams();
    const { user } = useSelector((state) => state.user)
  const book=async()=>{
    if (Object.keys(user).length === 0  ) {
      return  seterror('please login or register before booking')
    }
    if ( !name || !phone || !guests) {
      return seterror('please fill all the inputs')
    }
    const {data}=await axios.post('/booking/create',{place:id,user:user._id,name,phone,checkin,checkout,guests})
    const bookid =data._id
    nav('/account/bookings/'+ bookid)
  }
  let nights= 0
  if (checkin && checkout) {
    nights = differenceInCalendarDays(new Date(checkout),new Date(checkin))
  }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className=" my-8 grid gap-5 md:grid-cols-[2fr_1fr] grid-cols-1 ">
    <div className=" p-4  w-full">
      <div className=" my-4 ">
        <h2 className="font-semibold text-2xl">Description</h2>
        {select.description}
      </div>
      Check in :{select.checkin} <br />
      Check out :{select.checkout} <br />
      Max number of guests :{select.guests}
    </div>
    <div className="  shadow p-4 bg-white md:m-0 -mx-10  rounded-2xl shadow-gray-300 ">
      <div className=" text-xl text-center">
        Price : ${select.price} per night
      </div>
      <div className="border  items-center rounded-2xl mt-4">
        <div className=" ">
          <div className=" py-3 px-4 ">
            <label htmlFor="">Check in:</label>
            <input type="date" value={checkin} onChange={e=>setcheckin(e.target.value)} className=" border px-2" />
          </div>
          <div className=" py-3 px-4 border-1 ">
            <label htmlFor="">Check out:</label>
            <input type="date" value={checkout} onChange={e=>setcheckout(e.target.value)} className=" border px-2" />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="">Number of guests :</label>
          <input type="number" value={guests} onChange={e=>setguests(e.target.value)} className="  border px-2" />
        </div>
        {nights > 0 && (
          <>
           <div className="py-3 px-4 border-t">
           <label htmlFor="">Your full name :</label>
           <input type="text" placeholder="name" value={name} onChange={e=>setname(e.target.value)} className="  border px-2" />
         </div>
          <div className="py-3 px-4 border-t">
          <label htmlFor="">Phone number :</label>
          <input type="tel" value={phone} placeholder="number" onChange={e=>setphone(e.target.value)} className="  border px-2" />
        </div>
          </>
        )}
      </div>
    
        <button onClick={book} className=" mt-2 bg-primary w-full text-center py-2 px-3 text-white rounded-2xl">Book {nights > 0 && (
          <span>this room for {select.price * nights}</span>
        ) } </button>
          {error && (
        <p className=" mt-1 font-semibold text-xl">{error}</p>
      )}
    </div>
  </motion.div>
  )
}

export default Bookingform