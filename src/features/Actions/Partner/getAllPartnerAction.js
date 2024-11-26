import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllPartner = createAsyncThunk(
    "get/allPartners",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/api/v1/partners`,config)
            console.log("------------partners data", data);
            return data.data;
        } catch (error) {
           if (error.response && error.response.data.message) {
               return rejectWithValue(error.response.data.message);
           } else {
               return rejectWithValue(error.message);
           }
        }
    }
)