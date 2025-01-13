import { createSlice } from "@reduxjs/toolkit"
import { deletePartnerById, getAllPartner, updatePartner } from "../../Actions/Partner/getAllPartnerAction"
import { toast } from "sonner"

const initialState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    partner:{}
}

const partnerSlice = createSlice({
    name:"partners",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllPartner.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllPartner.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllPartner.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError= false;
            state.isSuccess= true;
            state.partner = action.payload;
            toast.success("All partners retrieved",{position:"top-right"})
        })
        .addCase(deletePartnerById.pending,(state)=>{
            state.isLoading= true
            state.isSuccess = false
            state.isError= false 
        })
        .addCase(deletePartnerById.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(deletePartnerById.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError= false
            state.isSuccess = true
            toast.success("Deleted the partner successfully",{position:"top-center"})
        })
        .addCase(updatePartner.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(updatePartner.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(updatePartner.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            toast.success("Updated the partner successfully",{position:"top-right"})
        })
    }
})

export default partnerSlice.reducer;