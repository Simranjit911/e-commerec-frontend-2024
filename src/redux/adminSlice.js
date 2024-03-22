import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../axiosConfig"
export const fetchAllUsers = createAsyncThunk('admin/users/all', async (_, thunkAPI) => {
    try {
        let res = await axios.get("/user/admin/users/all")
        return res.data
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})


let initialState = {
    users: {
        isError: false,
        isLoading: false,
        data: []
    },
    orders: {
        isError: false,
        isLoading: false,
        DataTransferItemList: []
    },
    products: {
        isError: false,
        isLoading: false,
        data: []
    },

}

let adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // All users
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.users.isLoading = true
                state.users.isError = false
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users.isLoading = false
                state.users.data = action.payload
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.users.isLoading = false
                state.users.isError = true
            })
    }
})

export default adminSlice.reducer