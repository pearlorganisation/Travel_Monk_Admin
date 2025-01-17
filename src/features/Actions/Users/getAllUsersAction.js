import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllUsers = createAsyncThunk(
    "get/allUsers",async({search,page=1},{rejectWithValue})=>{
        try {
            const config={
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const { data }= await axiosInstance.get(`/api/v1/users?search=${search}&page=${page}`,config)
            console.log("--------all users", data);
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


/** to add a user by the admin */
export const addUserByAdmin= createAsyncThunk(
    "create/user",async(userData, {rejectWithValue})=>{
        try {
            console.log("the user data is ", userData)
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.post(`/api/v1/users`,userData,config)
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