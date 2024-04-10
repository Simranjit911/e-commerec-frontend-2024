import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { _id: id, name } = action.payload;
            const existingProduct = state.cart.find(item => item._id === id);

            if (action.payload?.stock < 1) {
                toast.error("Products is out of stock now")
            }
            else if (existingProduct) {
                if (existingProduct.qty >= existingProduct.stock) {
                    toast.error("Products is out of stock now")
                } else {
                    if (existingProduct.qty >= 5) {
                        toast.error("You can buy only 5 at a single time")
                    } else {
                        existingProduct.qty++;
                        toast.success(`${name} added to cart!`);
                    }

                }
            } else {
                state.cart.push({ ...action.payload, qty: 1 });
                toast.success(`${name} added to cart!`);
            }
            saveCartToLocalStorage(state.cart);
        },
        loadCart: (state, action) => {

            state.cart = action.payload;
        },
        deleteFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            if (state.cart.length === 0) {
                localStorage.removeItem("cart");
            }
            saveCartToLocalStorage(state.cart)
            toast.success("Product removed from cart");
        },
        incQty: (state, action) => {
            const { _id: id } = action.payload;
            const existingProduct = state.cart.find(item => item._id === id);
            if (existingProduct) {
                if (existingProduct.qty >= existingProduct.stock) {
                    toast.error("Products is out of stock now")
                } else {
                    if (existingProduct.qty >= 5) {
                        toast.error("You can buy only 5 products at single time")
                    } else {

                        existingProduct.qty++;
                        toast.success(`Again ${existingProduct.name} added to cart!`);
                    }
                }
            } else {
                state.cart.push({ ...action.payload, qty: 1 });
            }
            saveCartToLocalStorage(state.cart);
        },
        decQty: (state, action) => {
            const { _id: id } = action.payload;
            const existingProduct = state.cart.find(item => item._id === id);
            if (existingProduct.qty > 1) {
                existingProduct.qty--;
                toast.success(`${existingProduct.name} removed from cart!`);
            } else {
                state.cart = state.cart
            }
            saveCartToLocalStorage(state.cart);
        },
    }
});

// Function to save cart data to localStorage
export const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
};

// Function to load cart data from localStorage
export const loadCartFromLocalStorage = (dis) => {
    let cartData = localStorage.getItem("cart");
    if (cartData) {
        cartData = JSON.parse(cartData)
        dis(loadCart(cartData))
        return cartData;
    }
    return [];
};

export const { addToCart, loadCart, deleteFromCart, incQty, decQty } = cartSlice.actions;
export default cartSlice.reducer;
