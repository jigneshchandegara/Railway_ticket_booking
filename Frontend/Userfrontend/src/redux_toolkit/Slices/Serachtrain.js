import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    Serachtrain: [],
    isloading: false,
    isError: null,
}

// getapi
export const getTrainSchedules = createAsyncThunk(
    'getTrainSchedules',
    async ({ departureStationId, arrivalStationId, date }) => {
        const response = await axios.get(
           `http://localhost:8080/Api/TrainSchedule/train-Search?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&date=${date}`
        );
        console.log(response.data ,"data");
        return response.data.data;
    }
);

const trainSlice = createSlice({
    name: 'trains',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTrainSchedules.pending, (state) => {
                state.isloading = true;
                state.isError = null;
            })
            .addCase(getTrainSchedules.fulfilled, (state, action) => {
                state.isloading = false;
                state.Serachtrain = action.payload;
                console.log( action.payload ,"action");
                
            })
            .addCase(getTrainSchedules.rejected, (state, action) => {
                state.isloading = false;
                state.isError = action.payload;
            });
    },
});

export default trainSlice.reducer;