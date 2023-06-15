import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'

import {useNavigate,Link} from 'react-router-dom'
import { setUser } from '../redux/slice'
import { motion } from 'framer-motion'
function Login() {
  const nav= useNavigate()
  const[email,setemail]=React.useState("")
  const[password,setpassword]=React.useState("")
  const [errors,seterror]=React.useState("")
  const dispatch=useDispatch()
  const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
        const {data} =await axios.post('/auth/login',{
          email,password
        }) 
        dispatch(setUser(data))
        setTimeout(() => {
          nav('/')
        }, 1500);      
      } catch (error) {
        seterror(error.response.data)
      }
  }
  return (
    <>
    <div className='flex flex-col grow mb-32 items-center justify-center '>
    <h2 className="my-4 text-2xl font-bold ">Login</h2>
    <form className=" flex flex-col gap-3 w-1/2" onSubmit={handlesubmit}>
        <input className="py-2 px-3 border border-grey-300 rounded-2xl" value={email} onChange={e=>setemail(e.target.value)} type="email" placeholder='email'/>
        <input  className="py-2 px-3 border border-grey-300 rounded-2xl"value={password} onChange={e=>setpassword(e.target.value)} type="password" placeholder='password' />
        <button className="py-2 px-3 rounded-2xl bg-primary text-white">Login</button>
        <p className=' text-grey-300 text-sm text-center'>doesn't have email,<Link to='/register' className=' font-semibold text-md text-black cursor-pointer'>  Register</Link></p>
        {errors.length >0 && <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className=' text-grey-300 text-sm text-center'>{errors}</motion.p>}
    </form>
    </div>
    </>
  )
}

export default Login