import { createSlice } from "@reduxjs/toolkit";
import {
  addActivity,
  deleteActivity,
  getActivityByID,
  getAllActivities,
  updateActivity,
} from "../../Actions/Activities/activitiesAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  paginate: {},
  activitiesData: {},
  singleActivity: {},
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllActivities.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getAllActivities.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.activitiesData = action.payload.data;
        state.paginate = action.payload.pagination;

        toast.success("All activities recieved", { position: "top-right" });
      })

      // get single activity
      .addCase(getActivityByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActivityByID.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(getActivityByID.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleActivity = action.payload;
        toast.success("All activities recieved", { position: "top-right" });
      })
      // Add Activity
      .addCase(addActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(addActivity.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Added Activity successfully", { position: "top-right" });
      })
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(deleteActivity.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Activity Deleted Successfully", {
          position: "top-right",
        });
      })

      // update activity

      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload, { position: "top-right" });
      })
      .addCase(updateActivity.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Activity Updated Successfully", {
          position: "top-right",
        });
      });
  },
});

export default activitiesSlice.reducer;
