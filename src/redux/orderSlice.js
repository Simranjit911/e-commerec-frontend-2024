import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

// Async thunk action to create a new order
export const createOrder = createAsyncThunk('order/new', async (data, nav, thunkAPI) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const res = await axios.post("/order/new", data, config);
        if (res.status == 200 ) {
            toast.success("Order Placed")
            return res.data
        }
        
    } catch (error) {
        // Log any errors
        console.log(error);
        toast.error("Order not Placed")
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

// Async thunk action to get logged in user's orders
export const getLoggedUserOrder = createAsyncThunk('/order/my', async (data, thunkAPI) => {
    try {
        // Make a GET request to fetch logged in user's orders
        const res = await axios.get("/order/me");
        // Log the response data
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
        return res.data
    } catch (error) {
        // Log any errors
        console.log(error);
    }
});

// Async thunk action to update an order by admin
export const updateOrder = createAsyncThunk('admin/order/update', async ({ orderId, status }, thunkAPI) => {
    try {
        // Make a PUT request to update the order status by admin
        const res = await axios.put(`/order/update?orderId=${orderId}`, { orderStatus: status });
        if (res.status == 200) {
            toast.success("Order status updated ")
        } else {
            toast.loading("Status not updated")
        }

    } catch (error) {
        // Log any errors
        toast.error("Error while updating status")
        console.log(error.msg);
        throw error;
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
                state.myOrders.isError = true

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
