import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

/**----------------this is used on adding vehicles page-----------------------------------*/
export const getDestinations = createAsyncThunk(
  "get/destinations",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/destinations?page=${page}`,
        config
      );
      console.log("-------------destination data", data);
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

export const getSingleDestination = createAsyncThunk(
  "get-single/destinations",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/destinations/${id}`,
        config
      );
      console.log("-------------destination data", data);
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

export const deleteDestination = createAsyncThunk(
  "delete/destinations",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.delete(
        `/api/v1/destinations/${id}`,
        config
      );
      console.log("delete destination data", data);
      return id;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addDestination = createAsyncThunk(
  "destination/addDestination",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("banner", userData.banner[0]);
      formData.append("image", userData.image[0]);
      console.log("destination type", userData.type);
      console.log("destination name", userData.name);
      console.log("destination start price", userData.startingPrice);
      for (const key in userData) {
        if (key !== "banner" && key !== "image") {
          if (typeof userData[key] === "object" && userData[key] !== null) {
            formData.append(key, JSON.stringify(userData[key]));
          } else {
            formData.append(key, userData[key]);
          }
        }
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/destinations`,
        formData,
        {
          config,
        }
      );

      console.log(data, "response data");
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

export const updateDestination = createAsyncThunk(
  "update/destination",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/destinations/${id}`,
        updatedData,
        config
      );
      return data; // Return the updated destination
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const togglePopularity = createAsyncThunk(
  "toggle-popularity/destination",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.patch(
        `/api/v1/destinations/${id}/toggle-popularity`,
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
