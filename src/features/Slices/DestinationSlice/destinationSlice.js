import { createSlice } from "@reduxjs/toolkit";
import {
  addDestination,
  getDestinations,
} from "../../Actions/Destination/destinationAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  destinationInfo: {},
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getting destinations
      .addCase(getDestinations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDestinations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getDestinations.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.destinationInfo = action.payload;
        toast.success("All destination recieved", { position: "top-right" });
      })

      // add destinations

      .addCase(addDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addDestination.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Destination created Successfully", {
          position: "top-right",
        });
      });
  },
});

export default destinationSlice.reducer;
