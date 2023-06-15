import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Photouploader from "./Photouploader";
import Perks from "./perks";
import { useDispatch, useSelector } from "react-redux";
import Accountnav from "./Accountnav";
import { setplaces,setallplaces } from "../redux/slice";
import { motion } from "framer-motion";

function Places() {
  const nav =useNavigate()
  const dispatch=useDispatch()
  const [title,settitle]=useState('')
  const [description,setdescription]=useState('')
  const [photos,setphotos]=useState([])
  const [address,setaddress]=useState('')
  const [perks,setperks]=useState([])
  const [extra,setextra]=useState('')
  const [checkout,setcheckout]=useState('')
  const [guests,setguests]=useState(1)
  const [checkin,setcheckin]=useState('')
  const [selected,setselected]=useState([])
  const [photoserror,setphotoserror]=useState('')
  const [price,setprice]=useState(0)
  const {user}=useSelector(state => state.user)
  const {places}=useSelector(state => state.user)
  const {id}=useParams()
  if (id && places.length > 0) {
    const [place] =places.filter( place => id === place._id )
    useEffect(()=>{
      settitle(place.title)
      setdescription(place.description)
      setphotos(place.photos)
      setcheckin(place.checkin)
      setcheckout(place.checkout)
      setguests(place.guests)
      setextra(place.extra)
      setselected(place.perks)
      setaddress(place.address)
      setprice(place.price)
    },[])
  }
  if (id && places.length === 0) {
    return nav('/')
  }
  const addplace=async(e)=>{
    e.preventDefault()
    const perks=selected
    const owner =user._id
    const path='/places/'+ id

    if(id){
      try {
        if (photos.length < 3) {
         return setphotoserror("please , three photos at least must be uploaded")
        }
    
        const {data}=  await axios.patch(path,{
          owner, perks, title,guests,checkin,checkout,extra,address,description,photos,price
          })
          const updated= places.map(place=>{
            return place._id === id ? data : place
           }) 
           dispatch(setallplaces([]))
          dispatch(setplaces(updated))
          setTimeout(() => {
            nav('/account/places')
          }, 1500);
        
      } catch (error) {
        
      }
    }else{
      if (photos.length < 3) {
        return setphotoserror("please , three photos at least must be uploaded")
       }
    
       try {
    
        const place=  await axios.post('/places/new',{
    
        owner, perks, title,guests,checkin,checkout,extra,address,description,photos,price
      })
      
      setTimeout(() => {
        nav('/account/places')
      }, 1500);
    } catch (error) {
      
    }
  }
  }
  
  return (
        <div>
          <Accountnav/>
          <motion.form animate={{opacity:1}} initial={{opacity:0}} transition={{duration:1.5}} onSubmit={addplace}>
            <h2 className="text-2xl mt-4">Title</h2>
            <input value={title} required onChange={e => settitle(e.target.value)} type="text" className="w-full border-2 rounded-md px-2" placeholder="title" />
            <h2 className="text-2xl mt-4">Address</h2>
            <input type="text" required value={address} onChange={e => setaddress(e.target.value)} className="w-full border-2 rounded-md  px-2" placeholder="address" />
            <h2 className="text-2xl mt-4">Photos</h2>
            <Photouploader photos={photos} setphotos={setphotos} />
            <h2 className="text-2xl mt-4">Description</h2>
            <textarea required value={description} onChange={e => setdescription(e.target.value)} className="w-full border-2 rounded-md px-2"></textarea>
            <h2 className="text-2xl mt-4">Perks</h2>
          <Perks setperks={setperks} selected={selected} setselected={setselected}/>
            <h2 className="text-2xl mt-4">Extra info</h2>
            <textarea required value={extra} onChange={e => setextra(e.target.value)}  className="w-full border-2 rounded-md px-2" ></textarea>
            <h2 className="text-2xl max-sm:text-lg mt-4">Check in & out and number of guests</h2>
            <div className="grid grid-cols-4 mb-5 max-md:grid-cols-2 gap-2 ">
                <div>
                    <h3 className="mt-2 mb-2">Check in</h3>
                    <input required type="number" value={checkin} onChange={e => setcheckin(e.target.value)} className="w-full border-2 rounded-md px-2"placeholder="check in"  />
                </div>
                <div>
                    <h3 className="mt-2 mb-2">Check out</h3>
                    <input type="number" required value={checkout} onChange={e => setcheckout(e.target.value)} className="w-full border-2 rounded-md px-2" placeholder="check out" />
                </div>
                <div>
                    <h3 className="mt-2 mb-2">max number of guests</h3>
                    <input type="number" required value={guests} onChange={e => setguests(e.target.value)} placeholder="number of guests" className="w-full border-2 rounded-md px-2"  />
                </div>
                <div>
                    <h3 className="mt-2 mb-2">Price per night</h3>
                    <input type="number" required value={price} onChange={e => setprice(e.target.value)} placeholder="price per night" className="w-full border-2 rounded-md px-2"  />
                </div>

            </div>
            <div className="mb-4 py-2">
                {photoserror.length > 3 && photos.length <3 && (
                  <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className="mt-1 font-semibold text-xl">{photoserror}</motion.p>
                )}
                <button className="bg-primary text-white py-2 w-full mt-4 rounded-2xl">Save</button>
            </div>
          </motion.form>
        </div>
  );
}

export default Places;
