import { createSlice } from "@reduxjs/toolkit"
import { deleteHotelContact, getAllHotelContacts } from "../../Actions/Hotels/hotelContactsAction"
import { toast } from "sonner"

const initialState={
    isLoading:false,
    isError:false,
    isSuccess:false,
    contactsHotel:{},
    paginate:{}
}


const contactsHotelsSlice = createSlice({
    name:"hotelcontacts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllHotelContacts.pending,(state)=>{
            state.isLoading= true
            state.isError=false
            state.isSuccess= false
        })
        .addCase(getAllHotelContacts.rejected,(state,action)=>{
            state.isSuccess= false
            state.isLoading=false
            state.isError = true
            state.contactsHotel= {}
            state.paginate= {}
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(getAllHotelContacts.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess= true
            state.isError=false
            state.contactsHotel= action.payload.data
            state.paginate = action.payload.pagination
            toast.success("all hotel contacts recieved",{position:"top-right"})
        })
        .addCase(deleteHotelContact.pending,(state)=>{
            state.isLoading=true
            state.isSuccess=false
            state.isError=false
        })
        .addCase(deleteHotelContact.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(deleteHotelContact.fulfilled,(state)=>{
            state.isLoading = false
            state.isError=false
            state.isSuccess=true
            toast.success("Deleted the contact successfully",{position:"top-right"})
        })
    }
})

export default contactsHotelsSlice.reducer;