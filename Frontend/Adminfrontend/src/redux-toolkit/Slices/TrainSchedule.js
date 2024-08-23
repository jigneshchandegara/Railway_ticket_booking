import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../ApiUrl";
import config from "../../config";

const initialState = {
    trainSchedule: [],
    isLoading: false,
    isError: null
};

//post data
export const addtrainschedule = createAsyncThunk("addtrainschedule", async (data, { rejectWithValue }) => {
    let { endpoint, payload } = data;
    console.log(payload);
    try {
        let res = await axios.post(BASE_URL + endpoint, payload, config);
        console.log(res.data, "post schedule");
        return res.data.data;
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})
// get data
export const gettrainschedule = createAsyncThunk("gettrainschedule", async (data,
    { rejectWithValue }) => {
    let { endpoint } = data;
    try {
        let res = await axios.get(BASE_URL + endpoint, config);
        console.log(res.data.data, "get schedule");
        return res.data.data;
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
}
)

export const trainscheduleslice = createSlice({
    name: "trainSchedule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //post method
            .addCase(addtrainschedule.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addtrainschedule.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(addtrainschedule.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainSchedule.push(action.payload)
                console.log("🚀 ~ .addCase ~ action:", action.payload)
            })
            //get method
            .addCase(gettrainschedule.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(gettrainschedule.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(gettrainschedule.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.trainSchedule = action.payload;
                console.log("🚀 ~ .addCase ~ action get:", action.payload)
            })

    }
})

export default trainscheduleslice.reducer

