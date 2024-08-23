import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../ApiUrl";
import config from "../../config";


let initialState = {
    classdata: [],
    isLoading: false,
    isError: null,
}

//post api
export const addclass = createAsyncThunk("postclass", async (data, { rejectWithValue }) => {
    const { endpoint, payload } = data;
    try {
        const res = await axios.post(BASE_URL + endpoint, payload, config);
        // console.log("🚀 ~ addclass ~ res:", res);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

//Get api
export const getclass = createAsyncThunk(
    "getclass",
    async (endpoint, { rejectWithValue }) => {
        // console.log("🚀 ~ endpoint:", endpoint)
        try {
            const res = await axios.get("http://localhost:8080/Api/Class/classlistget", config);
            // console.log("🚀 ~ grtres:", res)
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

//delete api
export const deleteclass = createAsyncThunk("deleteclass", async (data, { rejectWithValue }) => {
    let { endpoint, id } = data
    try {
        const res = await axios.delete(BASE_URL + endpoint + id, config);
        return id;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

//updata api 
export const updateclass = createAsyncThunk("updateclass", async (data, { rejectWithValue }) => {
    let { endpoint, id, payload } = data
    console.log("🚀 ~ = ~ updateclass ~ payload:", payload)
    try {
        const res = await axios.patch(BASE_URL + endpoint + id, payload, config);
        console.log("🚀 ~ = ~ updateclass ~ res updata:", res)
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})



//slice
export const classdataSlice = createSlice({
    name: "classdata",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //post method
            .addCase(addclass.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addclass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload; // Store the error message
            })
            .addCase(addclass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.classdata.push(action.payload);
            })
            //get method
            .addCase(getclass.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getclass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload; // Store the error message
            })
            .addCase(getclass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.classdata = action.payload;
                // console.log("🚀 ~ getclass method fulfilled:", action.payload);
            })
            //delete method
            .addCase(deleteclass.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteclass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })
            .addCase(deleteclass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.classdata = state.classdata.filter((item) => item._id !== action.payload);
            })
            //updata method
            .addCase(updateclass.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateclass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })
            .addCase(updateclass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.classdata = state.classdata.map((value) => value._id === action
                .payload._id ? action.payload : value);
                    console.log(action.payload,"updata data");
            })

    },
});


export default classdataSlice.reducer