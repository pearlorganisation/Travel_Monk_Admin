import { createSlice } from "@reduxjs/toolkit"
import { deleteNormalContact, getAllContacts } from "../../Actions/Contacts/contactAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    contacts:{}
}

const contactSlice =createSlice({
    name:"contacts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllContacts.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllContacts.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.contacts={}
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllContacts.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading= false;
            state.isSuccess = true;
            state.contacts = action.payload;
            toast.success("All contacts are retrived",{position:"top-right"})
        })
        .addCase(deleteNormalContact.pending,(state)=>{
            state.isLoading= true
            state.isSuccess = false
            state.isError= false
        })
        .addCase( deleteNormalContact.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess = false
            state.isError= true
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(deleteNormalContact.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess= true
            state.isError= false
            toast.success("Delete successfully",{position:"top-right"})
        })
    }
})

export default contactSlice.reducer;