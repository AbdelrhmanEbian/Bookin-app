
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Accountnav from './Accountnav'
import {differenceInCalendarDays,format}from 'date-fns'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Bookingplaces() {
    const {user}=useSelector(state => state.user)
  const[loading,setloading]=useState(false)
  const [error, seterror] = useState('');
  const [bookings,setbookings]=useState([])
  useEffect(()=>{
      const getall=async()=>{
        try {
            const {data}=await axios.post('/booking/allbookings',{user})
            setbookings(data)
            setTimeout(() => {
                setloading(true)
          }, 500);
        } catch (error) {
            
        }
    }
    
    getall()
},[])
if (bookings.length === 0 && loading === true) {
  
    return (
        <>
    <Accountnav/>
      <div className=' w-full absolute mt-5 text-center -ml-4  top-1/2 '>you haven't booked any room yet</div>
        </>
    )  }
    if(!loading){
      return (
        <>
        <Accountnav/>
        <div className='w-full absolute mt-5 text-center  -ml-4 top-1/2 '>
        <svg class="animate-spin h-16 block   w-16 m-auto  border-4  border-r-primary border-t-primary rounded-full " viewBox="0 0 24 24">
  </svg>
      </div>      
        </>
      )
      }
  return (
    <motion.div >
        <Accountnav/>
        <div className=' min-[1130px]:grid min-[1130px]:gap-4 min-[1130px]:grid-cols-2' >
            {bookings.length > 0 &&(
                bookings.map((booking,index)=>{
                    const delay =index===0 ? 0.3 : index/2 
                    return (
                        <motion.div animate={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:2,delay,type:'spring',bounce:0.5}}>

                        <Link   to={`/account/bookings/${booking._id}`} className='flex md:items-center max-sm:flex-col max-sm:gap-2  gap-4 my-5 bg-gray-200 rounded-2xl overflow-hidden'>
                            <div className=' w-64 lg:h-full max-sm:w-full' >
                                <img className=' lg:h-full' src={`http://localhost:3000/uploads/${booking.place.photos[0]}`} alt="" />
                            </div>
                            <div className='py-3 pr-3 max-sm:p-2 grow max-h-full'>
                                <h2 className='text-xl truncate'>{booking.place.title}</h2>
                                <div className='max-sm:text-md text-xl'>
                                      <div className=' mb-1 mt-1 text-gray-500 flex  gap-1'>
                                            {differenceInCalendarDays(new Date(booking.checkout),new Date(booking.checkin))} nights
                                            <div className=' flex gap-1 items-center  ml-2'>
                                                {format(new Date(booking.checkin),'yyyy-MM-dd')}
                                            </div>
                                            &rarr;
                                            <div className=' flex gap-1 items-center  ml-2'>
                                                {format(new Date(booking.checkout),'yyyy-MM-dd')}
                                            </div>
                                            
                                      </div>
                                      <div className=' flex gap-1 '>
                                        <span className="text-2xl">
                                            Total price : ${booking.place.price * differenceInCalendarDays(new Date(booking.checkout),new Date(booking.checkin))}
                                        </span>

                                      </div>

                                </div>

                            </div>

                        </Link>
                        </motion.div>
                    )
                })
            )}
        </div>
    </motion.div>
  )
}

export default Bookingplaces