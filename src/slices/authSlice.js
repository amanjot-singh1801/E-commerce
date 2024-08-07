import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    userType:localStorage.getItem("userType") ? JSON.parse(localStorage.getItem("userType")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, 
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setSignupData(state,action){
            state.signupData = action.payload;
        },

        setToken(state,action){
            state.token = action.payload;
        },
        setUserType(state,action){
            state.userType = action.payload;
        },
    },
});


export const { setSignupData,setToken,setUserType } = authSlice.actions;
export default authSlice.reducer;
