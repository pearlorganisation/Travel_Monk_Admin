import { createSlice } from "@reduxjs/toolkit"
import { addVehicle, deleteVehicle, getAllVehicles, UpdateVehicle } from "../../Actions/Vehicles/vehicleAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess:false,
    vehiclesInfo:{},
    isCreated:false,
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
            state.isCreated = false
        })
        .addCase(addVehicle.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess = false
            state.isError = true
            state.isCreated = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(addVehicle.fulfilled,(state,action)=>{
            state.isLoading = false 
            state.isSuccess = true
            state.isError = false
            state.isCreated = true
            toast.success("Added vehicle successfully",{position:"top-right"})
        })
        .addCase(deleteVehicle.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteVehicle.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(deleteVehicle.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("Vehicle Deleted Successfully",{position:"top-right"})
        })
        .addCase(UpdateVehicle.pending,state=>{
            state.isLoading = true
            state.isSuccess= false
            state.isError= false
        })
        .addCase(UpdateVehicle.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(UpdateVehicle.fulfilled, (state,action)=>{
            state.isLoading= false
            state.isSuccess = true
            state.isError= false
            toast.success("Vehicle Updated successfully", {position:"top-right"})
        })
    }
})

export default vehicleSlice.reducer;