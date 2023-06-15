import React,{useState}from 'react'
import { motion } from 'framer-motion'
export default function Photogallery({select,selected}){
  const [more,setmore]=useState(false)
  let classphoto=null
  if (more) {
    scrollTo(0,0)
    return(
      <div className=" text-white inset-0 min-w-screen min-h-screen absolute bg-black ">
        <div className=" grid gap-4 p-8  bg-black">
      <div>

        <motion.h3 initial={{x:-200}} animate={{x:0}} transition={{duration:1,bounce:.5}} className=" max-sm:mr-10 mr-2 my-3 text-3xl">Pictures of {selected.length>0 ? selected[0].title:select.title} </motion.h3>
        <button onClick={()=> setmore(false)} className=" max-sm:right-1 max-sm:top-1 fixed right-4 top-1 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
  close Photos
        </button>
      </div>
      <motion.div className=' grid grid-cols-1 gap-5' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>

      {
        selected.length > 0 ?(
          selected[0].photos.map((photo,index)=>{
            return(
              <motion.img key={selected[0]._id} initial={{scale:0}} animate={{scale:1}} transition={{duration:1}} className=" object-cover w-full " src={`https://airbnb-clone-api-hdi4.onrender.com/uploads/${photo}`} alt="" />
              )
            })):(select.photos.map((photo,index)=>{

              return(
                <motion.img key={selected[0]._id} className=" object-cover w-full " initial={{scale:0}} animate={{scale:1}} transition={{duration:1}} src={`https://airbnb-clone-api-hdi4.onrender.com/uploads/${photo}`} alt="" />
                )}))
              }
        </motion.div>
      </div>
              </div>
    )}
    return(
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}  className=" mb-10 relative ">
                <div className={" grid grid-cols-[2fr_1fr] rounded-3xl max-h-96 overflow-hidden gap-3"}>
                  <div className=' h-full'>
                    {select.photos?.[0] && (
                      <div key={select.photos[0]._id} className='h-full'>
                        <img className=" w-full h-full cursor-pointer object-cover" onClick={()=> setmore(true)}
                          src={`https://airbnb-clone-api-hdi4.onrender.com/uploads/${select.photos[0]}`}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid">
                    <div>
                      {select.photos?.[1] && (
                        <img className=" cursor-pointer" onClick={()=> setmore(true)}
                          src={`https://airbnb-clone-api-hdi4.onrender.com/uploads/${select.photos[1]}`}
                          alt=""
                        />
                      )}
                    </div>
                    <div className=" relative top-1">
                      {select.photos?.[2] && (
                        <img className=" cursor-pointer" onClick={()=> setmore(true)}
                          src={`https://airbnb-clone-api-hdi4.onrender.com/uploads/${select.photos[2]}`}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={()=> setmore(true)} className={" gap-1 px-3 py-1 rounded-2xl flex  shadow-md shadow-gray-500 absolute bottom-3 max-sm:right-10 max-sm:bottom-1 right-3 bg-white text-black items-center"}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="max-sm:w-4 max-sm:h-4 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
show more</button>
              </motion.div>
     )
}