import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion'
import axios from "axios";
import Photogallery from "./Photogallery";
import Bookingform from "./Bookingform";
function SelectedPlace() {
  const nav = useNavigate();
  const { id } = useParams();
  const { allplaces } = useSelector((state) => state.user)
  
  if (allplaces.length === 0) {
    nav("/");
  }
  const selected = allplaces.filter((place) => place._id === id);

  
  return (
    <div >
      {selected.length > 0 &&
        selected.map((select) => {
          return (
            <div key={select._id} className="mt-8 -mx-4 bg-gray-100 px-10 pt-5 ">
              <motion.h2  initial={{x:100}} animate={{x:0}} transition={{duration:1}} className=" text-3xl mt-2">{select.title}</motion.h2>
              <motion.a initial={{x:100}} animate={{x:0}} transition={{duration:1}}
                className=" underline  mt-4 flex gap-1  font-semibold mb-5 "
                href={"https://maps.google.com/?q=" + select.address}
                target="_blank"
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
 {select.address}
              </motion.a>
              <Photogallery selected={selected} select={select}/>
            <Bookingform select={select}/>
                <div className=" p-8  bg-white -mx-10  ">
                  <div>
                    <h2 className="text-2xl font-semibold">Extra info</h2>
                  </div>
                  <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
                    {select.extra}
                  </div>
                </div>
            </div>
          );
        })}
    </div>
  );
}

export default SelectedPlace;
