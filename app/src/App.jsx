import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Account from "./components/Account";
import Home from "./components/Home";
import axios from'axios'
import React, { useState } from "react";
import{setUser}from'./redux/slice'
import {Routes,Route,useNavigate}from 'react-router-dom'
import {useDispatch, useSelector}from 'react-redux'
import Places from "./components/Places";
import SelectedPlace from "./components/SelectedPlace";
import Bookingplaces from "./components/Bookingplaces";
import Bookingplace from "./components/Bookingplace";
import Getuser from "./components/Getuser";
function App() {
  axios.defaults.baseURL="http://localhost:3000"
  axios.defaults.withCredentials=true
  const {user}=useSelector(state=>state.user)
  return (
    <div className="flex flex-col pt-2 px-4 overflow-x-hidden min-h-screen">
      <Getuser/>
      <Header  />
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/"  element={<Home/>} />
      <Route path="/place/:id"  element={<SelectedPlace/>} />

      {Object.keys(user).length > 0 &&(
        <>
      <Route path="/account/:subpage?" element={<Account/>} />
      <Route path="/account/places/new" element={<Places/>} />
      <Route path="/account/places/:id" element={<Places/>} />
      <Route path="/account/bookings/:id"  element={<Bookingplace />} />
      <Route path="/account/bookings"  element={<Bookingplaces/>} />
        </>
      )}
      </Routes>
    </div>
  );
}

export default App;
