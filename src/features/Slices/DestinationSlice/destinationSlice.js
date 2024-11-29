import { createSlice } from "@reduxjs/toolkit"
import { getDestinations } from "../../Actions/Destination/destinationAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    destinationInfo:{}
}

const destinationSlice = createSlice({
    name:"destination",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getDestinations.pending, state=>{
            state.isLoading= true
        })
        .addCase(getDestinations.rejected,(state,action)=>{
            state.isLoading = false
            state.isError= true
            state.isSuccess= false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getDestinations.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess= true;
            state.isLoading = false
            state.destinationInfo = action.payload;
            toast.success("All destination recieved",{position:"top-right"})
        })
    }
})

export default destinationSlice.reducer