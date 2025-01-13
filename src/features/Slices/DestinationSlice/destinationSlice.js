import { createSlice } from "@reduxjs/toolkit";
import {
  addDestination,
  deleteDestination,
  getDestinations,
  getSingleDestination,
  togglePopularity,
  updateDestination,
} from "../../Actions/Destination/destinationAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  destinationInfo: {},
  destination: {},
  pagination: {},
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
        state.destinationInfo = action.payload.data;
        state.pagination = action.payload.pagination;
        toast.success("All destination recieved", { position: "top-right" });
      })

      // get single destination

      .addCase(getSingleDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getSingleDestination.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.destination = action.payload.data;
        toast.success("Single destination recieved", { position: "top-right" });
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
      })

      // delete destination
      .addCase(deleteDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;

        state.destinationInfo = state.destinationInfo.filter(
          (destination) => destination._id !== action.meta.arg
        );
        toast.success("Destination deleted Successfully", {
          position: "top-right",
        });
      })

      // update destination

      .addCase(updateDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        // Update the specific destination in the array
        state.destination = action.payload;

        toast.success("Destination updated successfully", {
          position: "top-right",
        });
      })

      // toggle popularity

      .addCase(togglePopularity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(togglePopularity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(togglePopularity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        // Update the specific destination in the array
        state.destination = action.payload;

        toast.success("Popularity updated successfully", {
          position: "top-right",
        });
      });
  },
});

export default destinationSlice.reducer;
