import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllActivities = createAsyncThunk(
    "get/allActivities",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/api/v1/activities`, config)
            return data.data
        } catch (error) {
          if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message);
          } else {
              return rejectWithValue(error.message);
          }
        }
    }
)