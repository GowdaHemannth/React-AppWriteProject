import { createSlice } from "@reduxjs/toolkit";

// Here its Nothing But Intialising the State 
const initialState={
    status:false,
    Userdata:null
}
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        // Certain things like Will Upadte Here 
        login:(state,action)=>{
            state.status=true,
            state.Userdata=action.payload.Userdata;
        },
        logout:(state)=>{
            state.status=false,
            state.Userdata=null
        }

    }
})
 export const{login,logout} =authSlice.actions;
export default authSlice.reducer