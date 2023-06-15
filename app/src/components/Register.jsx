import axios from 'axios'
import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slice'


function Register() {
    const [name,setname]=React.useState('')
    const [email,setemail]=React.useState('')
    const [sent,setsent]=React.useState("")
    const nav =useNavigate()
    const {user}=useSelector(state => state.user)
  if (Object.keys(user).length === 0) {
    nav('/')
  }
    const[loading,setloading]=React.useState(false)
    const [password,setpassword]=React.useState('')
    const [error,seterror]=React.useState("")
    const handlecheck=async(e)=>{
      e.preventDefault()
      seterror('')
      if (!name || !email || !password) {
        return seterror("please fill all inputs")
      }
        setloading(true)
        setsent('')
        try {
          const {data}=await axios.post('/auth/register',{
            name,password,email
          })
          setsent("data sent")
          setloading(false)
          setTimeout(() => {
            nav('/login')
          }, 500);      
        } catch (error) {
        setloading(false)
        console.log(error);
        if (error.response.data.code === 11000) {
          return setsent("email is already used")
        }
        setsent('please try again')
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
        {error.length >1 && <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className=' text-grey-300 text-sm text-center'>{error}</motion.p>}

        {sent.length > 1  &&<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className=' text-grey-300 text-sm text-center'> {sent}</motion.p>}
        {loading && (
            <svg class="animate-spin h-8 block   w-8 m-auto  border-4  border-r-primary border-t-primary rounded-full " viewBox="0 0 24 24">
      </svg>
        )}
    </form>
    </div>
    </>
  )
}

export default Register