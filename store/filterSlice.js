import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getFilterData = createAsyncThunk("filter/getFilterData",async (url)=>{
    try{
        const response = await axios.post(`${process.env.baseurl}/filter/${url}`)
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
})
const filterSlice = createSlice({
    name:'filter',
    initialState:{
        isLoading:false,
        error:null,
        products:[],
        title:"",
        productCount:0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFilterData.pending,(state)=>{
            state.isLoading=true;
            state.error=null;
            state.products=[];
            state.title="";
            state.productCount=0;
        });
        builder.addCase(getFilterData.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error=null;
            state.productCount = action.payload?.result?.count;
            state.products = action.payload?.result?.product;
            state.title = action.payload?.result?.title;
            // console.log(action.payload);
        }),
        builder.addCase(getFilterData.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
            state.productCount=0;
            state.title="";
            state.products=[];
        })
    }
})
export default filterSlice.reducer;