 
import { createSlice } from "@reduxjs/toolkit";
import { getDestinationVehicle } from "../../Actions/DestinationVehicle/destinationVehicleAction";
import { toast } from "sonner";

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    destinationVehicles: null
}

const get_Destination_Vehicle_Slice = createSlice({
    name: "destination_vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDestinationVehicle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDestinationVehicle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.destinationVehicles = null
                toast.error(action.payload,{position:"top-center"})
            })
            .addCase(getDestinationVehicle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.destinationVehicles = action.payload;
                toast.success("All destination vehicles retrieved",{position:"top-right"})
            })
    }
})

export default get_Destination_Vehicle_Slice.reducer;