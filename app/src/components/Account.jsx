import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams,useNavigate}from 'react-router-dom'
import {setUser}from '../redux/slice'

import axios from'axios'
import Places from './Places'
import Accountnav from './Accountnav'
function Account() {
    const {user} = useSelector(state => state.user)
    const nav= useNavigate()
    const dispatch=useDispatch()
    if (Object.keys(user).length = 0) {
        nav('/')
    }
    let {subpage}= useParams()
    if(subpage === undefined){
        subpage = 'profile'
    }
    const logout=async()=>{
        await axios.post('/auth/logout')
        dispatch(setUser({}))
        nav('/login')
    }
  return (
    <>
<Accountnav/>
    {subpage === 'profile' &&
    (
        <div className='mt-10 max-w-xl mx-auto text-center'>
           <p>Logged as {user.name} ({user.email})</p> 
            <button onClick={logout} className='bg-primary rounded-full text-white w-1/2 py-1 max-w-lg mt-5'>Logout</button>
        </div>
    )}  
    </>
  )
}

export default Account