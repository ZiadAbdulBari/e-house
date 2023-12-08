import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import cart from "./cartSlice";
import filter from "./filterSlice";
const store = configureStore({
    reducer:{
        auth:auth,
        cart:cart,
        filter:filter,
    }
})

export default store;