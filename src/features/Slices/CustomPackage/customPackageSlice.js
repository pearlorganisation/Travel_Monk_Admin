import { createSlice } from "@reduxjs/toolkit"
import { createCustomPackage } from "../../Actions/CustomPackage/customPackage"
import { toast } from "sonner"

const initialState ={
    isLoading:false,
    isSuccess:false,
    isError:false,
    customPackagesData:{}
}

const customPackageSlice = createSlice({
    name:"custompackage",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createCustomPackage.pending,(state)=>{
            state.isLoading = true
            state.isSuccess= false
            state.isError= false
        })
        .addCase(createCustomPackage.rejected,(state,action)=>{
            state.isLoading= false
            state.isError=true
            state.isSuccess=false
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(createCustomPackage.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isSuccess= true
            state.isError=false
            toast.success("Created the custom package successfully",{position:"top-right"})
        })
    }
})

export default customPackageSlice.reducer;