import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const createCustomPackage= createAsyncThunk(
    "create/custompackage",async(userData,{rejectWithValue})=>{
        try {
            
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }

            const {
                data
            } = await axiosInstance.post(`/api/v1/custom-packages`, userData, config)
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

/** to get all the custom packages */
export const getAllCustomPacakges = createAsyncThunk(
    "get/custom-packages",async(_, {rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {data} = await axiosInstance.get(`/api/v1/custom-packages`,config);
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

/** to delete a custom package */
export const deletePackageById =createAsyncThunk(
    "delete/custom-package",async(id, {rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.delete(`/api/v1/custom-packages/${id}`, config)
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