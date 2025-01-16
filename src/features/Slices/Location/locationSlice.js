import { createSlice } from "@reduxjs/toolkit"
import { addLocation, deleteLocationById, getAllLocations, updateLocation } from "../../Actions/Location/locationAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isSuccess:false,
    isError:false,
    allLocations:{},
    paginate:{}
}

const locationSlice = createSlice({
    name:"location",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addLocation.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addLocation.rejected,(state,action)=>{
            state.isLoading= false
            state.isError= true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(addLocation.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError= false
            state.isSuccess= true
            toast.success("Location Added")
        })
        .addCase(getAllLocations.pending,(state)=>{
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
        })
        .addCase(getAllLocations.rejected,(state,action)=>{
            state.isLoading= false
            state.isError=true
            state.isSuccess= false
            state.allLocations = {}
            state.paginate= {}
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(getAllLocations.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.paginate= action.payload.pagination
            state.allLocations = action.payload.data;
            toast.success("All Location recieved", {position:"top-right"})
        })
        .addCase(updateLocation.pending,state=>{
            state.isLoading= true
            state.isSuccess=false
            state.isError= false;
        })
        .addCase(updateLocation.rejected,(state,action)=>{
            state.isSuccess = false
            state.isError= true
            state.isLoading= false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(updateLocation.fulfilled,(state,action)=>{
            state.isError= false
            state.isSuccess= true
            state.isLoading= false
            toast.success("Updated the location Successfuly",{position:"top-right"})
        })
        .addCase(deleteLocationById.pending,(state)=>{
            state.isLoading = true
            state.isError=false
            state.isSuccess=false
        })
        .addCase(deleteLocationById.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(deleteLocationById.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            toast.success("Location Deleted Successfully",{position:"top-right"})
        })
    }
})

export default locationSlice.reducer