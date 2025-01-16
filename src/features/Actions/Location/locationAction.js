import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";
import axios from "axios";

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

/** to update all the location */

export const updateLocation = createAsyncThunk(
    "update/location",async(formData,{rejectWithValue})=>{
        try {
            const { id } = formData
            console.log("the formdata is in action", formData)
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.patch(`/api/v1/destinations/locations/${id}`, formData, config)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

/** to delete a location */

export const deleteLocationById = createAsyncThunk(
    "delete/location",async(id, {rejectWithValue})=>{
        try {
            console.log('the id is', id)
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/destinations/locations/${id}`,config)
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


/** get locations based on destination */
export const DestinationLocation = createAsyncThunk(
    "get/destination-locations", async (id, {
        rejectWithValue
    }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/destinations/${id}/locations`, config)
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