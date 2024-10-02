import { configureStore } from "@reduxjs/toolkit";
import  userdetail  from "../Slices/SignSlices";
import trainSlice from "../Slices/Serachtrain"
import { bookingslice } from "../Slices/Booking";


export const store = configureStore({
    reducer: {
        userdata:userdetail,
        trains: trainSlice,
        booking:bookingslice,
    }
})