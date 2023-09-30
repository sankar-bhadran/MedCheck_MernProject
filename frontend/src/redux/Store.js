import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import adminReducer from './features/admiSlice'
import centerReducer from './features/CenterSlice'
import GoogleReducer from './features/googleSlice'
import LabReducer from './features/labSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    admin:adminReducer,
    center:centerReducer,
    google:GoogleReducer,
    labcenter:LabReducer
  },
});

export default store;
