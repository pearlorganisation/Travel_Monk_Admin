import { createSlice } from "@reduxjs/toolkit"
import { addPackage, getAllPackages } from "../../Actions/TripPackages/packageAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    packageInfo:{}
}

const packageSlice = createSlice({
    name:"package",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllPackages.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllPackages.rejected,(state,action)=>{
            state.isError= true;
            state.isSuccess= false;
            state.isLoading= false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllPackages.fulfilled,(state,action)=>{
            state.isError= false;
            state.isLoading = false;
            state.isSuccess = true;
            state.packageInfo = action.payload;
            toast.success("All the packages retrieved",{position:"top-right"})
        })
        .addCase(addPackage.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addPackage.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(addPackage.fulfilled,(state,action)=>{
             state.isLoading = false
             state.isError = false
             state.isSuccess = true
             toast.success("Package Added Successfully",{position:"top-right"})
        })
    }
})

export default packageSlice.reducer;