import axios, { all } from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";

function Photouploader({ setphotos, photos }) {
  const [photolink, setphotolink] = useState("");
  const addphotobylink = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/places/upload-link", {
      link: photolink,
    });
    setphotos((prev) => {
      return [...prev, data];
    });
    setphotolink("");
  };
  const uploadfromdevice = async (e) => {
    const files=e.target.files
  try {
    const { data } = await axios.post("/places/upload-device",files,{'Content-Type': 'multipart/form-data',});
    setphotos((prev) => {
      return [...prev, ...data];
    });
  } catch (error) {
    
  }
  };
  const removephoto = (photoLink) => {
    const newphotos = photos.filter((photo) => photo !== photoLink);
    setphotos(newphotos);
  }
  const setasdefault=(photoLink)=>{
    const newphotos = photos.filter((photo) => photo !== photoLink);
    setphotos([photoLink,...newphotos]);
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          value={photolink}
          onChange={(e) => setphotolink(e.target.value)}
          type="text"
          className="w-full border-2 rounded-md px-2"
          placeholder="Add url here"
        />
        <button
          onClick={addphotobylink}
          className="rounded-2xl bg-gray-200 w-40 py-1 px-3 "
        >
          Add photo
        </button>
      </div>
      <div className="grid gap-2  sm:grid-cols-2 grid-cols-2 lg:grid-cols-6 md:grid-cols-4 mt-8 ">
        {photos.length > 0 &&
          photos.map((photo,index) => {
            const delay= index === 0 ? 0.3 : index/2
            return (
              <motion.div animate={{opacity:1,x:0,display:"block"}} initial={{opacity:0,x:-100,display:'none'}} transition={{duration:2,delay,type:'spring',bounce:0.5}} className=" relative" key={photo}>
                <img
                  className="flex w-full h-32  object-fill rounded-2xl"
                  src={"https://airbnb-clone-api-hdi4.onrender.com/uploads/" + photo}
                  alt=""
                />
                <div
                  onClick={() => removephoto(photo)}
                  className=" cursor-pointer absolute p-2 text-white rounded-2xl   right-2 bottom-2 bg-opacity-50 bg-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
                <div
                  onClick={() => setasdefault(photo)}
                  className=" cursor-pointer absolute p-2 text-white rounded-2xl   left-2 bottom-2 bg-opacity-50 bg-black"
                >
                  {photo === photos[0] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </div>
              </motion.div>
            );
          })}
        <motion.label className=" flex  gap-2 justify-center cursor-pointer  items-center border bg-transparent rounded-2xl p-8 text-gray-500 text-2xl">
          <motion.input type="file" multiple={true} onChange={(e)=>uploadfromdevice(e)} hidden  />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8  h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </motion.label>
      </div>
    </>
  );
}

export default Photouploader;
