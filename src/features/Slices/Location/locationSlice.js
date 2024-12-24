import { createSlice } from "@reduxjs/toolkit"
import { addLocation } from "../../Actions/Location/locationAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isSuccess:false,
    isError:false,
    allLocations:{}
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
    }
})

export default locationSlice.reducer