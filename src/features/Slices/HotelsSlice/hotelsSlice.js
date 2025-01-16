import { createSlice } from "@reduxjs/toolkit";
import { FaSearch } from "react-icons/fa";
import { addHotel, deleteHotel, getAllHotels, getHotelsByDestination, updateHotel } from "../../Actions/Hotels/hotelsAction";
import { toast } from "sonner";

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    hotelsData:{},
    destinationHotels:{}
}

const hotelSlice = createSlice({
    name:"hotels",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllHotels.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllHotels.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllHotels.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError= false
            state.hotelsData = action.payload
            toast.success("All hotels recieved",{position:"top-right"})
        })
        .addCase(addHotel.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(addHotel.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(addHotel.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            toast.success("Added Hotel",{position:"top-center"})
        })
        .addCase(deleteHotel.pending,(state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError= false
        })
        .addCase(deleteHotel.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess= false
            state.isError = true
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(deleteHotel.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError= false
            toast.success("Hotel Deleted Successfully",{position:"top-right"})
        })
        .addCase(updateHotel.pending,(state)=>{
            state.isLoading = true
            state.isSuccess= false
            state.isError = false
        })
        .addCase(updateHotel.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(updateHotel.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError= false
            toast.success("Updated the Hotel",{position:"top-right"})
        })
        .addCase(getHotelsByDestination.pending,(state)=>{
            state.isLoading = true
            state.isSuccess=false
            state.isError = false
        })
        .addCase(getHotelsByDestination.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError=true
            state.destinationHotels={},
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(getHotelsByDestination.fulfilled,(state,action)=>{
            state.isSuccess= true
            state.isError = false
            state.isLoading=false
            state.destinationHotels= action.payload.data
            toast.success("Hotels Recieved",{position:"top-right"})
        })
    }
})

export default hotelSlice.reducer