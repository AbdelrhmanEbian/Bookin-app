import axios from 'axios'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'


function Register() {
    const [name,setname]=React.useState('')
    const [email,setemail]=React.useState('')
    const [sent,setsent]=React.useState("")
    const [password,setpassword]=React.useState('')
    const handlecheck=async(e)=>{
        e.preventDefault()
        try {
          const data=await axios.post('/auth/register',{
            name,password,email
          })
          setsent("data sent")
          setTimeout(() => {
            nav('/')
          }, 1500);      
        } catch (error) {
          setsent("please try again")
        }

    }
  return (
    <>
    <div className='flex flex-col grow mb-32 items-center justify-center '>
    <h2 className="my-4 text-2xl font-bold ">Register</h2>
    <form onSubmit={handlecheck} className=" flex flex-col gap-3 w-1/2" >
        <input  className="py-2 px-3 border border-grey-300 rounded-2xl" onChange={e=>setname(e.target.value)} type="name" placeholder='name' />
        <input className="py-2 px-3 border border-grey-300 rounded-2xl" onChange={e=>setemail(e.target.value)} type="email" placeholder='email'/>
        <input  className="py-2 px-3 border border-grey-300 rounded-2xl" onChange={e=>setpassword(e.target.value)} type="password" placeholder='password' />
        <button className="py-2 px-3 rounded-2xl bg-primary text-white">Register</button>
        <p className=' text-grey-300 text-sm text-center'> have email, <Link className=' text-md font-semibold text-black cursor-pointer'>Login</Link> </p>
        {sent.length > 1  &&<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className=' text-grey-300 text-sm text-center'> {sent}</motion.p>}
    </form>
    </div>
    </>
  )
}

export default Register