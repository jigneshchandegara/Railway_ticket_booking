import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../ApiUrl";
import config from "../../config";

let initialState = {
    traintype: [],
    isLoading: false,
    isError: null,
}

// post Api
export const addtraintype = createAsyncThunk("posttraintype", async (data, { rejectWithValue }) => {
    let { endpoint, payload } = data;
    try {
        let res = await axios.post(BASE_URL + endpoint, payload, config);
        console.log("🚀 ~ addtraintype ~ res:", res.data.data);
        return res.data.data
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})

//get Api
export const gettraintype = createAsyncThunk("gettraintype", async (data,
    { rejectWithValue }) => {
    let { endpoint } = data;
    try {
        let res = await axios.get(BASE_URL + endpoint, config);
        console.log("🚀 ~ gettraintype ~ res:", res.data.data);
        return res.data.data
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})

//delete Api
export const deletetrainType = createAsyncThunk("deletetrainType", async (data
    , { rejectWithValue }) => {
    let { endpoint, id } = data;
    try {
        let res = await axios.delete(BASE_URL + endpoint + id, config);
        // console.log("🚀 ~ deletetrainType ~ res:", res.data.data);
        return id
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})

//update Api
export const updatetrainType = createAsyncThunk("updatetrainType", async (data,
    { rejectWithValue }) => {
    let { endpoint, id, payload } = data;
    try {
        let res = await axios.patch(BASE_URL + endpoint + id, payload, config);
        // console.log("🚀 ~ updatetrainType ~ res updata:", res.data.data);
        return res.data.data
    } catch (Error) {
        return rejectWithValue(Error.response ? Error.response.data : Error.message);
    }
})



//slice
export const traintypeSlice = createSlice({
    name: "traintype",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            //post method
            .addCase(addtraintype.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addtraintype.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(addtraintype.fulfilled, (state, action) => {
                state.isLoading = false;
                state.traintype.push(action.payload)
                console.log(action.payload);
            })
            //get method
            .addCase(gettraintype.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(gettraintype.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(gettraintype.fulfilled, (state, action) => {
                state.isLoading = false;
                state.traintype = action.payload;
                console.log(action.payload,"GET TRAIN TYPE");
            })
            //delete method
            .addCase(deletetrainType.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deletetrainType.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(deletetrainType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.traintype = state.traintype.filter((item) => item._id !== action.payload);
            })
            //update method
            .addCase(updatetrainType.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updatetrainType.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(updatetrainType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.traintype = state.traintype.map((value) => value._id === action
                    .payload._id ? action.payload : value);
            })

    }

})

export default traintypeSlice.reducer;
