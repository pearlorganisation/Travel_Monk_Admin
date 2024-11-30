import { createSlice } from "@reduxjs/toolkit"
import { getAllActivities } from "../../Actions/Activities/activitiesAction"
import { toast } from "sonner"

const initialState = {
    isLoading:false,
    isError:false,
    isSuccess: false,
    activitiesData:{}
}

const activitiesSlice = createSlice({
    name:"activities",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllActivities.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllActivities.rejected,(state,action)=>{
            state.isError = true
            state.isLoading= false
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllActivities.fulfilled,(state,action)=>{
             state.isError = false
             state.isLoading = false
             state.isSuccess = true
             state.activitiesData = action.payload
             toast.success("All activities recieved",{position:"top-right"})
        })
    }
})

export default activitiesSlice.reducer;