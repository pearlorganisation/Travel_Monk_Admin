import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

/** to get the reset link */
export const forgotPassword = createAsyncThunk(
    "forgot-password/email", async(email,{rejectWithValue})=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.post(`/api/v1/users/forgot-password`,email,config)
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

/** to reset the password after getting the link */
export const resetPassword = createAsyncThunk(
    "forgot-password/password-reset",async({password,token},{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.post(`/api/v1/users/reset-password/${token}`, { password },config)
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