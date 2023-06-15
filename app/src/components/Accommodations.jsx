import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setplaces } from '../redux/slice'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Accommodations() {
    const {places}=useSelector(state => state.user)
    const {user}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const[error,seterror]=useState('')
  const[loading,setloading]=useState(false)
     useEffect(()=>{
         async function getplaces() {   
             const owner=user._id
             try {
                 const {data}=await axios.post('/places/getall',{owner})         
                 if(data.length === 0){
                    seterror("you don't have any accommodations" )
                 }
                 dispatch(setplaces(data))
                 setTimeout(() => { 
                 setloading(true)
                    }, 500);
                } catch (error) {
                }
                
            }
            getplaces()
        }
    ,[])
    if(!loading){
        return (
            <div className='w-full absolute mt-5 text-center  -ml-4 top-1/2 '>
            <svg className="animate-spin h-16 block   w-16 m-auto  border-4  border-r-primary border-t-primary rounded-full " viewBox="0 0 24 24">
      </svg>
          </div>        
          )
      }
      if (error.length > 0 && loading === true) {
        return (
            <div className=' w-full absolute mt-5 text-center -ml-4  top-1/2 '>{error}</div>
        )
      }
  return (
    <>
    {
        places.length > 0 && 
            places.map((place,index)=>{
                const delay =index === 0? 0.3 : index/2
             return(
                <motion.div key={place._id} animate={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:2,delay,type:'spring',bounce:0.5}}>

             <Link to={'/account/places/'+ place._id}  className=' flex sm:items-center   max-sm:flex-col max-sm:gap-2 max-sm:w-3/4 mx-auto  gap-4 my-5 bg-gray-200 rounded-2xl'>
                    <div className='rounded-2xl w-64    max-sm:w-full '>
                        <img className=' object-cover h-full max-sm:rounded-t-2xl max-sm:rounded-bl-none rounded-l-2xl ' src={"https://airbnb-clone-api-hdi4.onrender.com/uploads/"+ place.photos[0] } alt="" />
                    </div>
                    <div className=' py-3 px-4 w-3/4 max-sm:w-full overflow-hidden sm:max-h-32 '>
                        <h2 className='text-xl  max-md:text-lg font-bold max-sm:text-md '>{place.title}</h2>
                        <p className='text-md mt-2  max-h-max p-1  max-md:text-md '>{place.description}</p>
                    </div>
                </Link>
 </motion.div>   
           )
     })
 }
 </>
  )
}

export default Accommodations