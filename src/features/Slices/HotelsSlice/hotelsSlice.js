import { createSlice } from "@reduxjs/toolkit";
import { FaSearch } from "react-icons/fa";
import { addHotel, getAllHotels } from "../../Actions/Hotels/hotelsAction";
import { toast } from "sonner";

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    hotelsData:{}
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
    }
})

export default hotelSlice.reducer