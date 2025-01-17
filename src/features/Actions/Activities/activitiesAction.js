import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllActivities = createAsyncThunk(
  "get/allActivities",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/activities?page=${page}`
      );

      console.log("get API of Activities with pagination", data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getActivityByID = createAsyncThunk(
  "activity/get",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/activities/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/**  Action to add activity */

export const addActivity = createAsyncThunk(
  "create/activity",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/activities`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** handle to delete the activity */

export const deleteActivity = createAsyncThunk(
  "activity/delete",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/activities/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** handle to update the activity */

export const updateActivity = createAsyncThunk(
  "activity/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.put(
        `/api/v1/activities/${id}`,
        userData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


/** get activities by destination id */
export const getActivitiesByDestinationId = createAsyncThunk(
  "get/activitiedByDestination", async (id, {
    rejectWithValue
  }) => {
    try {
      console.log('the id is', id)
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const data = await axiosInstance.get(`/api/v1/destinations/${id}/activities`, config)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)