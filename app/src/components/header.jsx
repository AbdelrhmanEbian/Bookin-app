import React from 'react'
import {useSelector}from 'react-redux'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
function Header() {
  const user =useSelector(state=> state.user.user)
  return (
    <><motion.header initial={{y:-50,opacity:0}} transition={{duration:1}} animate={{y:0,opacity:1}} className=" m-1 flex   justify-between">
    <Link to={'/'} className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 text-primary -rotate-90 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
      <span className=" text-xl font-bold ">airbnb</span>
    </Link>
    <motion.div  className=" max-sm:hidden flex gap-2 border border-grey-300 rounded-full shadow-md shadow-grey-300 px-2 py-4">
      <div>Anywhere</div>
      <div className="border border-l-1 border-grey-300"></div>
      <div>Any Week</div>
      <div className="border border-l-1 border-grey-300"></div>
      <div>Add geusts</div>
      <button className="bg-primary text-white rounded-full  px-1 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4  h-4"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
    <Link to={Object.keys(user).length > 0?'/account':'/login'} className="flex gap-2 item-center border  basis-32  border-grey-300 rounded-full py-4 px-2 justify-around">
        <div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
        </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
        >
        <path
          fillRule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          clipRule="evenodd"
          />
      </svg>
    </div>
    {
      user.name && (
        <div className=' truncate '>
          {user.name}
        </div>
      )  
    }
    
          </Link>
  </motion.header></>
  )
}

export default Header