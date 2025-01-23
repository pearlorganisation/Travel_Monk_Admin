import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const adminLogin = createAsyncThunk(
  "user/admin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/auth/login`,
        { email, password },
        config
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

/** to get the data of the logged in user */
export const getProfileData =createAsyncThunk(
  "get/profile-data", async(_,{rejectWithValue})=>{
    try {
      const config ={
        headers:{
          "Content-Type":"application/json"
        }
      }
      const {
        data
      } = await axiosInstance.get(`/api/v1/users/me`, config)
      return data
    } catch (error) {
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message)
      }else{
        return rejectWithValue(error.message)
      }      
    }
  }
)

/** to update the profile */
export const updateProfile = createAsyncThunk(
  "update/profile", async(userData, {rejectWithValue})=>{
    try {
      const config ={
        headers:{
          "Content-Type":"application/json"
        }
      }
      const { data } = await axiosInstance.patch(`/api/v1/users/me`, userData,config)
      return data;
    } catch (error) {
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message)
      }
      else{
        return rejectWithValue(error.message)
      }
    }
  }
)


/** for changing the password */
export const changePassword = createAsyncThunk("user/updatePassword", async ({
  currentPassword,
  newPassword,
  confirmNewPassword
}, {
  rejectWithValue
}) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const {
      data
    } = await axiosInstance.post("/api/v1/users/change-password", {
        currentPassword,
        newPassword,
        confirmNewPassword
      },
      config
    )
    console.log(data, " Updated password data");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
})

/** admin logout */
export const adminLogout = createAsyncThunk(
  "logout/admin",async(_,{rejectWithValue})=>{
    try {
      const config ={
        headers:{
          "Content-Type":"application/json"
        }
      }
      const {
        data
      } = await axiosInstance.post(`/api/v1/auth/logout`, config)
      return data;
    } catch (error) {
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message)
      }else{
        return rejectWithValue(error.message)
      }
    }
  }
)