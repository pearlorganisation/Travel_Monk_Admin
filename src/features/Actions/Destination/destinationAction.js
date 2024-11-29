import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

/**----------------this is used on adding vehicles page-----------------------------------*/
export const getDestinations = createAsyncThunk(
    "get/destinations", async(_,{rejectWithValue})=>{
       try {
          const config = {
              headers: {
                  "Content-Type": "application/json"
              }
          }
          const {
              data
          } = await axiosInstance.get(`/api/v1/trips/destination`,config);
          console.log('-------------destination data', data)
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