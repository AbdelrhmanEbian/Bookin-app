import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  places: [],
  allplaces:[],
  loadinguser:true
};

const mySlice = createSlice({
  name: 'user',
  initialState, // Corrected variable name
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setplaces:(state,{payload})=>{
      state.places = payload;

    },
    setallplaces:(state,{payload})=>{
      state.allplaces = payload;

    },
    setloadinguser:(state)=>{
      state.loadinguser=false
    }
  }
});

export const {setloadinguser, setUser ,setplaces,setallplaces} = mySlice.actions;

export default mySlice.reducer;
