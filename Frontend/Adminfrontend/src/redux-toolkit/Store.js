import { configureStore } from "@reduxjs/toolkit";
import stationSlice from "./Slices/Station";
import traintypeSlice from "./Slices/Traintype";
import  classdataSlice  from "./Slices/ClassData";
import  trainscheduleslice  from "./Slices/TrainSchedule";


export const store = configureStore({
    reducer: {
        station: stationSlice,
        traintype: traintypeSlice,
        classdata:classdataSlice,
        trainSchedule: trainscheduleslice

    }
})