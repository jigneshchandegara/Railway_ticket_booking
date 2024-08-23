import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../Api_url"

const initialState = {
    user: [],
    isloading: false,
    isError: null,
}

//post Api
export const adduser = createAsyncThunk("postuser", async (data, { rejectWithValue }) => {
    const { endpoint, payload } = data
    try {
        const res = await axios.post(BASE_URL + endpoint, payload);
        console.log(res.data.data, "adduser");
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

//Slice
export const userdetail = createSlice({
    name: "userdata",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adduser.pending, (state) => {
                state.isloading = true;
                state.isError = null;
            })
            .addCase(adduser.rejected, (state, action) => {
                state.isloading = false;
                state.isError = action.payload;
            })
            .addCase(adduser.fulfilled, (state, action) => {
                state.isloading = false;
                state.user.push(action.payload);
            })
    }
})

export default userdetail.reducer
