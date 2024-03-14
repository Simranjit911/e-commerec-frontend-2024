import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';
import toast from 'react-hot-toast';

export const fetchProducts = createAsyncThunk(
  'products/all',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/product/all");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchProductswithQuery = createAsyncThunk('products/query', async (query, thunkAPI) => {
  try {
    const response = await axios.get(`/product/all?${query}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }



})

export const fetchSingleProduct = createAsyncThunk(
  'product/single',
  async (id, thunkAPI) => {
    try {
      console.log("call")
      let res = await axios.get(`/product/one/${id}`)
      return res.data.product
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
);

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  singleProduct: {
    product: {},
    isLoading: false,
    isError: false
  }
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.error;
      })
      // Single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProduct.isLoading = true
        state.singleProduct.isError = false
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct.product = action.payload
        state.singleProduct.isLoading = false
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProduct.isError = action.payload.error
        state.singleProduct.isLoading = false
      })
      //fetch with query
      .addCase(fetchProductswithQuery.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductswithQuery.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProductswithQuery.rejected, (state, action) => {
        state.isLoading = false
        state.isError = action.payload.error
        toast.error(state.isError)
      })
  }
});
export default productSlice.reducer;