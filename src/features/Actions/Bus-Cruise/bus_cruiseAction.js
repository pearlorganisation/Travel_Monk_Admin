import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getBusCruise = createAsyncThunk(
    "get/busCruise", async(params,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                },
                params
            }
            const { data } = await axiosInstance.get(`/api/v1/contacts/bus-cruise`,config);
            console.log("bus-cruise data---------------------------------",data);
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

/** to delete a bus-cruise contact form */
export const deleteBusCruiseContact = createAsyncThunk(
    "delete/bus-cruisecontacts",async(id, {rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/contacts/bus-cruise/${id}`,config)
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
