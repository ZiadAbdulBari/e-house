import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import cart from "./cartSlice";
const store = configureStore({
    reducer:{
        auth:auth,
        cart:cart,
    }
})

export default store;