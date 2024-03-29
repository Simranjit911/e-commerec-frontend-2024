import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Async thunk action to create a new order
export const createOrder = createAsyncThunk('order/new', async (data, thunkAPI) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        // Make a POST request to create a new order
        const res = await axios.post("/order/new", data, config);
        // Log the response data
        console.log(res.data);
    } catch (error) {
        // Log any errors
        console.log(error);
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Async thunk action to get logged in user's orders
export const getLoggedUserOrder = createAsyncThunk('/order/my', async (data, thunkAPI) => {
    try {
        console.log("call")
        // Make a GET request to fetch logged in user's orders
        const res = await axios.get("/order/me");
        // Log the response data
        console.log(res.data);
        return res.data
    } catch (error) {
        // Log any errors
        console.log(error);
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Async thunk action to get a single order by ID
export const getSingleOrder = createAsyncThunk('/order/one', async (id, thunkAPI) => {
    try {
        // Make a GET request to fetch a single order by ID
        const res = await axios.get(`/order/one/${id}`);
        // Log the response data
        console.log(res.data);
        return res.data
    } catch (error) {
        // Log any errors
        console.log(error);
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Async thunk action to get all orders for admin
export const getAllOrders = createAsyncThunk('admin/orders/all', async (_, thunkAPI) => {
    try {
        // Make a GET request to fetch all orders for admin
        const res = await axios.get("/order/all");
        // Log the response data
        console.log(res.data);
        return res.data
    } catch (error) {
        // Log any errors
        console.log(error);
    }
});

// Async thunk action to update an order by admin
export const updateOrder = createAsyncThunk('admin/order/update', async (data, thunkAPI) => {
    try {
        // Make a PUT request to update an order by admin
        const res = await axios.put('/order/update', data, config);
    } catch (error) {
        // Log any errors
        console.log(error);
    }
});

// Async thunk action to delete an order by admin
export const deleteOrder = createAsyncThunk('admin/order/delete', async (id, thunkAPI) => {
    try {
        // Make a DELETE request to delete an order by admin
        const res = await axios.delete(`/order/${id}`);
    } catch (error) {
        // Log any errors
        console.log(error);
    }
});

const initialState = {
    allOrders: {
        isLoading: false,
        isError: false,
        order: []
    },
    myOrders: {
        isLoading: false,
        isError: false,
        order: []
    },
    singleOrder: {
        isLoading: false,
        isError: false,
        order: {}
    }
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: ((builder) => {
        // Extra reducers can be added here if needed
        builder
            .addCase(getLoggedUserOrder.pending, (state) => {
                state.myOrders.isLoading = true
            })
            .addCase(getLoggedUserOrder.rejected, (state, action) => {
                state.myOrders.isLoading = false
                state.myOrders.isError = true

            })
            .addCase(getLoggedUserOrder.fulfilled, (state, action) => {
                state.myOrders.order = action.payload
                state.myOrders.isLoading = false
                state.myOrders.isError = false
            })
            // single order
            .addCase(getSingleOrder.pending, (state) => {
                state.singleOrder.isLoading = true
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.singleOrder.isLoading = false
                state.singleOrder.isError = true

            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.singleOrder.order = action.payload
                state.singleOrder.isLoading = false
                state.singleOrder.isError = false
            })
            // all orders
            .addCase(getAllOrders.pending, (state) => {
                state.allOrders.isLoading = true
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.allOrders.isLoading = false
                state.allOrders.isError = true

            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.allOrders.order = action.payload
                state.allOrders.isLoading = false
                state.allOrders.isError = false
            })
    })
});

export default orderSlice.reducer;
