import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllVehicles = createAsyncThunk(
    "get/allVehicles",async({page=1},{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/api/v1/vehicles?page=${page}`,config);
            console.log('---------------vehicles data', data)
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

/**  Action to add Vehicle */

export const addVehicle = createAsyncThunk(
    "create/vehicle",async(userData,{rejectWithValue})=>{
        try {
            const formData = new FormData();
            console.log('-----------', userData)
            //  userData.images.forEach((image) => {
            //      formData.append("images", image);
            //  });
            formData.append("image",userData.image)
            for(const key in userData){
                if(key !== "image"){
                    formData.append(key, userData[key])
                }
            }

            const {data} = await axiosInstance.post(`/api/v1/vehicles`, formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
            })
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


/** handle to delete the vehicle */

export const deleteVehicle = createAsyncThunk(
    "vehicle/delete",async(id,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axiosInstance.delete(`/api/v1/vehicles/${id}`,config)
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

/** UPDATE VEHICLE */
export const UpdateVehicle = createAsyncThunk(
    "update/vehicle", async(userData,{rejectWithValue})=>{
        try {
            const formData = new FormData()
            const { id } = userData
            formData.append("image", userData.image)
            for(const key in userData){
                if(key !== "image"){
                    formData.append(key, userData[key])
                }
            }
            const {
                data
            } = await axiosInstance.patch(`/api/v1/vehicles/${id}`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            return data;
        } catch (error) {
          if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message);
          } else {
              return rejectWithValue(error.message);
          }
        }
    })