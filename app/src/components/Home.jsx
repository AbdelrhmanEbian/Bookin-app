import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setallplaces } from '../redux/slice'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
function Home() {
  const dispatch =useDispatch()
  const {allplaces}=useSelector(state=>state.user)
  const [loading,setloading]=useState(false)
  useEffect(()=>{
    const getallplaces =async()=>{
      try {
        const {data}=await axios.get('/places/getallplaces')
        dispatch(setallplaces(data))
        setTimeout(() => {
        setloading(true)
        }, 500);
      } catch (error) {
        
      }
    }
    getallplaces()
  },[])
  if(!loading){
    return (
      <div className='w-full absolute mt-5 text-center  -ml-4 top-1/2 '>
        <svg className="animate-spin h-16 block   w-16 m-auto   border-4  border-r-primary border-t-primary rounded-full " viewBox="0 0 24 24">
  </svg>
      </div>
    )
  }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className='grid grid-cols-5 max-sm:grid-cols-2 max-lg:grid-cols-3 gap-y-8 gap-x-3 rounded-2xl mt-8'>
      {
        allplaces.length > 0 && allplaces.map((place)=>{
          return (
            <Link key={place._id} to={'/place/'+ place._id} className='bg-gray-100 pb-4  rounded-2xl '>
              <div className='h-40'>
                <img className='w-full aspect-square h-full rounded-t-2xl' src={'http://localhost:3000/uploads/' + place.photos[0]} alt="" />
              </div>
              <div className='px-2'>

              <h3 className=' font-bold mt-2'>{place.address} </h3>
              <h2 className='text-sm truncate text-gray-500'>{place.title}</h2>
              <div className='mt-2'>
                <span className=' font-bold '>${place.price} </span>per night
              </div>

              </div>


            </Link>


          )
        })
      }
    </motion.div>
  )
}

export default Home