import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setloadinguser } from '../redux/slice';

function Getuser() {
    const dispatch= useDispatch()
  const[user,setuser]=useState({})
  const nav=useNavigate()
  const[loading,setloading]=useState(false)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const  response = await axios.post('/auth/profile');
        dispatch(setUser(response.data))
        setuser(response.data)
        dispatch(setloadinguser())
        setloading(true)
      } catch (error) {
        setloading(true)
        dispatch(setloadinguser())
        nav('/')
      }
    }
    fetchData()
  }, []);
  return (
    <>
  {
      !loading  && (
        <div  className='w-full absolute mt-5 text-center  -ml-4 top-1/2 '>
        <svg className="animate-spin h-16 block   w-16 m-auto   border-4  border-r-primary border-t-primary rounded-full " viewBox="0 0 24 24">
  </svg>
      </div>
    )
}
</>
  )
}

export default Getuser