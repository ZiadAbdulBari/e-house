import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedin:false,
        token:null,
    },
    reducers:{
        getLoggedinStatus:(state)=>{
            if(window.localStorage.getItem('isLoggedin') == null || window.localStorage.getItem('isLoggedin') == undefined){
                window.localStorage.setItem('isLoggedin',JSON.stringify(false));
                state.isLoggedin = false;
            }
            else{
                const status = JSON.parse(window.localStorage.getItem('isLoggedin'));
                state.isLoggedin = status;
            }
        },
        getToken:(state)=>{
            if(state.isLoggedin){
                state.token = JSON.parse(window.localStorage.getItem('token'));
            }
            else{
                state.token = null;
            }
        }
    }
})

export const {getLoggedinStatus,getToken} = authSlice.actions;
export default authSlice.reducer;