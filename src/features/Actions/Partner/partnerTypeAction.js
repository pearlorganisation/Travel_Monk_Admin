import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getPartnerType = createAsyncThunk(
    "get/partnerType",async(_,{rejectWithValue})=>{
        try {
            const config={
                headers: {
                   "Content-Type":"application/json"
                }
            }

            const {
                data
            } = await axiosInstance.get(`/api/v1/partnerTypes`,config)
            console.log("-----------------partner type data", data)
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

/**-----------------------Create Partner Type--------------------------*/
export const createPartnerType = createAsyncThunk(
    "create/partnerTypes", async ({partnerTypeName},{rejectWithValue})=>{
        try {
             const config = {
                 headers: {
                     "Content-Type": "application/json"
                 }
             }
             const {
                 data
             } = await axiosInstance.post(`/api/v1/partnerTypes`,{partnerTypeName},{config})
             console.log("----------data", data);
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