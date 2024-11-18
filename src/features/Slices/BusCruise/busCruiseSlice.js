import { createSlice } from "@reduxjs/toolkit"
import { getBusCruise } from "../../Actions/Bus-Cruise/bus_cruiseAction"
import { toast } from "sonner"

const initialState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    bus_cruise:{}
}

const busCruiseSlice = createSlice({
    name:"bus-cruise",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getBusCruise.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getBusCruise.rejected,(state,action)=>{
            state.isLoading= false;
            state.isError = true;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getBusCruise.fulfilled,(state,action)=>{
              state.isLoading = false;
              state.isError = false;
              state.isSuccess = true;
              state.bus_cruise= action.payload;
              toast.success("Retrieved all the cruise and bus details", {
                  position: "top-right"
              })
        })
    }
})


export default busCruiseSlice.reducer;