import axios from "axios";
import { BASE_URL } from "../Api_url";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import config from '../../config';



const initialState = {
    Bookingtrain: [],
    isloading: false,
    isError: null,
}

export const bookingpost = createAsyncThunk(
    'getTrainSchedules',
    async (data, { rejectWithValue }) => {
        const { endpoint, payload } = data
        console.log("🚀 ~ payload:", payload)
        try {
            const res = await axios.post(BASE_URL + endpoint, payload );
            console.log(res, "booking");
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

//Slice
export const bookingslice = createSlice({
    name: "bookingdata",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bookingpost.pending, (state) => {
                state.isloading = true;
                state.isError = null;
            })
            .addCase(bookingpost.rejected, (state, action) => {
                state.isloading = false;
                state.isError = action.payload;
            })
            .addCase(bookingpost.fulfilled, (state, action) => {
                state.isloading = false;
                state.Bookingtrain.push(action.payload);
            })
    }
})