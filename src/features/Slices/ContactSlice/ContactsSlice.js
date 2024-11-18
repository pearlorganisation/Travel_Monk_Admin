import { createSlice } from "@reduxjs/toolkit"
import { getAllContacts } from "../../Actions/Contacts/contactAction"
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
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllContacts.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading= false;
            state.isSuccess = true;
            state.contacts = action.payload;
            toast.success("All contacts are retrived",{position:"top-right"})
        })
    }
})

export default contactSlice.reducer;