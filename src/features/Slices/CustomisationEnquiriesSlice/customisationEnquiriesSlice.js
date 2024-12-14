import { createSlice } from "@reduxjs/toolkit"
import { deleteFullyCustomizedEnquiry, deletePrebuiltEnquiry, getFullyCustomizedEnquiries, getPreBuiltPackageCustomisationEnquiries } from "../../Actions/CustomizationEnquiries/customisationEnquiriesAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isSuccess: false,
    isError: false,
    prebuiltPackageEnquiries:{},
    fullyCustomizedEnquiries:{},
    prebuiltPagination:{},
    fullyPagination:{}
}

const EnquiriesSlice = createSlice({
    name:"enquiries",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getPreBuiltPackageCustomisationEnquiries.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(getPreBuiltPackageCustomisationEnquiries.rejected,(state,action)=>{
            state.isSuccess= false
            state.isError = true
            state.isLoading = false
            state.prebuiltPackageEnquiries = {}
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getPreBuiltPackageCustomisationEnquiries.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isError = false
            state.isLoading = false
            state.prebuiltPackageEnquiries= action.payload.data
            state.prebuiltPagination= action.payload.pagination
            toast.success("All Prebuilt Enquiries are recieved",{position:"top-right"})
        })
        .addCase(getFullyCustomizedEnquiries.pending,(state)=>{
             state.isLoading = true
             state.isSuccess = false
             state.isError = false
        })
        .addCase(getFullyCustomizedEnquiries.rejected,(state,action)=>{
            state.isSuccess = false
            state.isError = true
            state.isLoading = false
            state.fullyCustomizedEnquiries= {}
            toast.error(action.payload, {
                position: "top-right"
            })
        })
        .addCase(getFullyCustomizedEnquiries.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isError = false
            state.isLoading = false
            state.fullyCustomizedEnquiries = action.payload.data
            state.fullyPagination = action.payload.pagination
            toast.success("All Fully customized enquiries are recieved",{position:"top-right"})
        })
        .addCase(deletePrebuiltEnquiry.pending,(state)=>{
            state.isSuccess = false
            state.isLoading = true
        })
        .addCase(deletePrebuiltEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(deletePrebuiltEnquiry.fulfilled,(state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            toast.success("Enquiry is deleted",{position:"top-right"})
        })
         .addCase(deleteFullyCustomizedEnquiry.pending, (state) => {
            state.isSuccess = false
            state.isLoading = true
        })
        .addCase(deleteFullyCustomizedEnquiry.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload, {
                position: "top-right"
            })
        })
        .addCase(deleteFullyCustomizedEnquiry.fulfilled, (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            toast.success("Enquiry is deleted", {
                position: "top-right"
            })
        })
    }
})

export default EnquiriesSlice.reducer