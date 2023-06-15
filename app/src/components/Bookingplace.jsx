import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Photogallery from "./Photogallery";

import {differenceInCalendarDays,format}from 'date-fns'
import { motion } from "framer-motion";
function Bookingplace() {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [booking, setbooking] = useState({});
  const nav=useNavigate()
  const[loading,setloading]=useState(false)
  useEffect(() => {
    const getbooking = async () => {
      try {
        const { data } = await axios.post(`/booking/${id}`, { user: user._id });
        if(!data){
        return  nav("/")
        }
        setbooking(data);
        setTimeout(() => {
          
          setloading(true)
        }, 500);
      } catch (error) {
        
      }

    };
      getbooking();
      
    
  }, [id]);
  if(!loading){
    return (
<div className='w-full absolute mt-5 text-center  -ml-4 top-1/2 '>
        <svg class="animate-spin h-16 block   w-16 m-auto  border-4  border-r-primary border-t-primary rounded-full " viewBox="0 0 24 24">
  </svg>
      </div>  
        )
    
  }
  
  return (
    <div className="max-md:flex max-md:flex-col   max-md:justify-between max-md:items-center">
      {Object.keys(booking).length > 0 && (
        <motion.div animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1}} key={booking._id} className="mt-2   -mx-4 bg-gray-100 px-10 pt-5 ">
        <motion.h2  initial={{x:100}} animate={{x:0}} transition={{duration:1}} className=" text-3xl mt-2">{booking.place.title}</motion.h2>
              <motion.a initial={{x:100}} animate={{x:0}} transition={{duration:1}}
                className=" underline  mt-4 flex gap-1  font-semibold mb-5 "
                href={"https://maps.google.com/?q=" + booking.place.address}
                target="_blank"
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
 {booking.place.address}
              </motion.a>
          <div className=" text-xl max-md:flex-col max-md:text-center flex items-center bg-white justify-between rounded-2xl p-5 -mt-1 mb-3">
            <div className=" mb-1 mt-1 text-gray-500  ">
              <div className=" flex gap-1 items-center">
                {format(new Date(booking.checkin), "yyyy-MM-dd")}
              &rarr;
             
                {format(new Date(booking.checkout), "yyyy-MM-dd")}
              </div>
              <div>

              {differenceInCalendarDays(
                new Date(booking.checkout),
                new Date(booking.checkin)
                )}{" "}
              nights
                </div>
            </div>
            <div className=" max-md:w-3/4 mt-3 bg-primary text-white rounded-2xl py-3 px-5 text-center ">
              <div className="text-2xl">
                Total price 
                </div>
                ${booking.place.price *
                  differenceInCalendarDays(
                    new Date(booking.checkout),
                    new Date(booking.checkin)
                  )}
            </div>
          </div>
          <Photogallery select={booking.place} selected={booking} />
          <div className=" p-4  w-full">
      <div className=" my-4 ">
        <h2 className="font-semibold text-2xl">Description</h2>
        {booking.place.description}
      </div>
      Check in :{booking.place.checkin} <br />
      Check out :{booking.place.checkout} <br />
      Max number of guests :{booking.place.guests}
    </div>
          <div className=" p-8 mt-5 bg-white -mx-10  ">
                  <div>
                    <h2 className="text-2xl font-semibold">Extra info</h2>
                  </div>
                  <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
                    {booking.place.extra}
                  </div>
                </div>
        </motion.div>
      )}
    </div>
  );
}

export default Bookingplace;
