import { createSlice } from "@reduxjs/toolkit"
import { createCustomPackage, getAllCustomPacakges } from "../../Actions/CustomPackage/customPackage"
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
        .addCase(getAllCustomPacakges.pending,state=>{
            state.isLoading= true
            state.isSuccess=false
            state.isError= false
        })
        .addCase(getAllCustomPacakges.rejected,(state,action)=>{
            state.isError= true
            state.isSuccess= false
            state.isLoading= false
            state.customPackagesData= {}
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(getAllCustomPacakges.fulfilled,(state,action)=>{
            state.isError=false
            state.isSuccess= true
            state.isLoading= false
            state.customPackagesData= action.payload.data
            toast.success("Custom packages recieved",{position:"top-right"})
        })
    }
})

export default customPackageSlice.reducer;