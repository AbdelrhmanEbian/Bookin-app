import { configureStore } from '@reduxjs/toolkit';
import myReducer from './slice';

const store = configureStore({
  reducer: {
    user: myReducer,
  },
});

export default store;
