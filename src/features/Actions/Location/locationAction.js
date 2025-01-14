import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const addLocation = createAsyncThunk(
    "add/location",async({id, data},{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const {
                res
            } = await axiosInstance.post(`/api/v1/destinations/${id}/locations`,data, config)
            return res
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


/** to get all the destinations */

export const getAllLocations = createAsyncThunk(
    "get/alldestinations",async({page=1},{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/destinations/locations?page=${page}`,config)
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