import { createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../../Actions/Users/getAllUsersAction"
import { toast } from "sonner"

const initialState = {
  isLoading : false,
  isError: false,
  isSuccess: false,
  usersInfo:{}
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading= false;
            state.isSuccess= false;
            state.usersInfo = {}
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess= true;
            state.usersInfo = action.payload;
            toast.success("Retrieved All the users",{position:"top-right"})
        })
    }
});

export default userSlice.reducer;