import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./productSlice"
import userReducer from "./userSlice"
import adminReducer from "./adminSlice"
import cartReducer from "./cartSlice.js"
import orderReducer from "./orderSlice.js"
export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        admin: adminReducer,
        cart: cartReducer,
        order:orderReducer
    },
})

export default store