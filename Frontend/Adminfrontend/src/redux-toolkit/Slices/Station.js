import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../ApiUrl";
import axios from "axios";
import config from "../../config";


const initialState = {
    station: [],
    isLoading: false,
    isError: null
};

// API call
//POST DATA
export const addStation = createAsyncThunk(
    "poststation",
    async (data, { rejectWithValue }) => {
        let { endpoint, payload } = data;
        try {
            let res = await axios.post(BASE_URL + endpoint, payload, config);
            // console.log(res.data.data, "res.data.add");
            return res.data.data
        } catch (Error) {
            return rejectWithValue(Error.response ? Error.response.data : Error.message);
        }
    }
);

//Get data
export const getStation = createAsyncThunk(
    "getStation",
    async ({ endpoint }, { rejectWithValue }) => {
        try {
            let res = await axios.get(BASE_URL + endpoint, config);
            // console.log(res.data.data, "res.data.get");
            return res.data.data
        } catch (Error) {
            return rejectWithValue(Error.response ? Error.response.data : Error.message);
        }
    }
)

//deletedata
export const deletestation = createAsyncThunk("deletestation", async (data, { rejectWithValue }) => {
    let { endpoint, id } = data;
    console.log(id, "api id");
    try {
        let res = await axios.delete(`${BASE_URL}${endpoint}${id}`, config)
        // console.log(res.data, "res.data.delete");
        return id
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})

//updatadata 
export const updatastation = createAsyncThunk("updatastation", async (data, { rejectWithValue }) => {
    let { endpoint, id, payload } = data;
    try {
        let res = await axios.patch(`${BASE_URL}${endpoint}${id}`, payload, config);
        // console.log(res.data, "res.data.updata");
        return res.data.data
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})

// Slice
export const stationSlice = createSlice({
    name: "station",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            //post method
            .addCase(addStation.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addStation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(addStation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.station.push(action.payload)
            })

            //get method
            .addCase(getStation.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getStation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(getStation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.station = action.payload;
            })

            //delete
            .addCase(deletestation.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deletestation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(deletestation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.station = state.station.filter((item) => item._id !== action.payload);
            })

            //updata
            .addCase(updatastation.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updatastation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(updatastation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.station = state.station.map((value) => {
                    if (value._id === action.payload._id) {
                        return action.payload
                    } else {
                        return value
                    }
                })
            })
    }
})

export default stationSlice.reducer;


