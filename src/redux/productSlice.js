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
    console.log(query)
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

      let res = await axios.get(`/product/one/${id}`)
      return res.data.product
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
);
export const deleteProduct = createAsyncThunk('product/delete', async (id) => {
  try {
    let res = await axios.delete(`/product/delete/${id}`)
    if (res.data.msg === "Product deleted!") {
      toast.success(res.data.msg)
      return res.data.msg
    }
    else {
      toast.error("Product not deleted!")
    }
    return res.data
  } catch (error) {
    console.log(error)
  }
})
export const addNewProduct = createAsyncThunk(
  'product/add/new',
  async (data, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // Ensure data is sent in the correct format

      console.log(data)
      const response = await axios.post("/product/new", data, config);
      console.log(response.data);

      if (response.data.msg === "Product created!") {
        toast.success("Product created!");
      } else {
        toast.error("Failed to create product");
      }

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the product");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const updateProduct = createAsyncThunk('product/update', async ({ id, data }) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    let res = await axios.put(`/product/update/${id}`, data, config);
    console.log(res.data);
    if (res.data.msg == "Product Updated!") {
      toast.success("Product Updated!")
    }
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to update product")
    throw error;
  }
});


// Reviews
//get all review
export const addProductReview = createAsyncThunk('product/review/new', async (data, thunkAPI) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    let res = await axios.post('/product/addreview', data, config)
    if (res.status == 201) {
      toast.success("Product Reviewed Successfully")
    }


  } catch (error) {
    console.log(error)
    toast.error("Error in Adding Review")
  }
})
export const deleteReview = createAsyncThunk(
  'product/review/delete',
  async (data, thunkAPI) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" }
      };
      console.log(data)
      const res = await axios.delete('/product/deletereview',{data},config);
      if (res.status === 200) {
        toast.success('Review Deleted!');
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
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
  },

};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSingleProduct: (state) => {
      state.singleProduct.product = {}
    }
  },
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
export const { clearSingleProduct } = productSlice.actions
export default productSlice.reducer;