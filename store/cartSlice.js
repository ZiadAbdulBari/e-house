import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./authSlice";

export const getCartProduct = createAsyncThunk(
  "cart/getCartProduct",
  async () => {
    try{
      // {headers: { Authorization: token }}
      const response = await axios.get("http://localhost:4000/get-cart");
      window.localStorage.setItem('cart',JSON.stringify(response?.data?.cart_product))
      window.localStorage.setItem('totalPrice',JSON.stringify(response?.data?.totalPrice))
      return response.data;
    }
    catch(error){
      console.log(error.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartProduct: [],
    error: null,
    cartCount: 0,
    total_price:0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartProduct.pending, (state) => {
      state.isLoading = true;
      state.cartProduct = [];
      state.cartCount = 0;
      state.total_price = 0;
      state.error = null;
    });
    builder.addCase(getCartProduct.fulfilled, (state, action) => {
      // console.log(action.payload)
      state.isLoading = false;
      state.cartProduct = action.payload?.cart_product;
      state.total_price = action.payload?.totalPrice;
      state.cartCount = state.cartProduct?.length;
      state.error = null;
    });
    builder.addCase(getCartProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.cartProduct = [];
      state.cartCount = 0;
      state.total_price = 0;
      state.error = action.error.message;
    });
  },
});
export default cartSlice.reducer;
