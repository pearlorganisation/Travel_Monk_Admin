import { createSlice } from "@reduxjs/toolkit"
import { forgotPassword, resetPassword } from "../../Actions/ForgotPassword/ForgotPasswordAction"
import { toast } from "sonner"

const initialState ={
    isLoading:false,
    isSuccess:false,
    isError: false
}

const ForgotPasswordSlice = createSlice({
    name:"forgot-password",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(forgotPassword.pending, state=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(forgotPassword.rejected,(state,action)=>{
            state.isSuccess = false
            state.isLoading = false
            state.isError = true
            toast.error(action.payload.success,{position:"top-right"})
        })
        .addCase(forgotPassword.fulfilled,(state)=>{
            state.isSuccess = true
            state.isError = false
            state.isLoading = false
            toast.success("Mail is sent check your inbox or spam",{position:"top-right"})
        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(resetPassword.rejected, (state, action) => {
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
                toast.error(action.payload.success, {
                    position: "top-right"
                })
            })
        .addCase(resetPassword.fulfilled, (state) => {
            state.isSuccess = true
            state.isError = false
            state.isLoading = false
            toast.success("Password changed successfully", {
                position: "top-right"
            })
        })
    }
})

export default ForgotPasswordSlice.reducer