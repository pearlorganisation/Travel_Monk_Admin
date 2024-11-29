import { createSlice } from "@reduxjs/toolkit"
import { addVehicle, getAllVehicles } from "../../Actions/Vehicles/vehicleAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess:false,
    vehiclesInfo:{},
}


const vehicleSlice = createSlice({
    name:"vehicles",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllVehicles.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllVehicles.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllVehicles.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError= false
            state.isSuccess = true
            state.vehiclesInfo = action.payload
            toast.success("All Vehicles recieved",{position:"top-right"})
        })
        .addCase(addVehicle.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addVehicle.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(addVehicle.fulfilled,(state,action)=>{
            state.isLoading = false 
            state.isSuccess = true
            state.isError = false
            toast.success("Added vehicle successfully",{position:"top-right"})
        })
    }
})

export default vehicleSlice.reducer;