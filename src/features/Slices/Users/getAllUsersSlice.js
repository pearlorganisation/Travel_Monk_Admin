import { createSlice } from "@reduxjs/toolkit"
import { addUserByAdmin, getAllUsers } from "../../Actions/Users/getAllUsersAction"
import { toast } from "sonner"

const initialState = {
  isLoading : false,
  isError: false,
  isSuccess: false,
  usersInfo:{},
  addUsers:{
    isLoading: false,
    isSuccess:false,
    isError:false
  },
  paginate:{}
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
            state.paginate={}
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess= true;
            state.paginate= action.payload.pagination
            state.usersInfo = action.payload.data;
            toast.success("Retrieved All the users",{position:"top-right"})
        })
        .addCase(addUserByAdmin.pending,(state)=>{
            state.addUsers = state.addUsers ?? {}
            state.addUsers.isLoading= true
            state.addUsers.isError=false
            state.addUsers.isSuccess = false
        })
        .addCase(addUserByAdmin.rejected,(state,action)=>{
            state.addUsers = state.addUsers ?? {}
            state.addUsers.isError = true
            state.addUsers.isSuccess = false
            state.addUsers.isLoading= false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(addUserByAdmin.fulfilled,(state,action)=>{
            state.addUsers = state.addUsers ?? {}
            state.addUsers.isLoading= false
            state.addUsers.isError= false
            state.addUsers.isSuccess = true
            toast.success("Added user successfully",{position:"top-right"})
        })
    }
});

export default userSlice.reducer;