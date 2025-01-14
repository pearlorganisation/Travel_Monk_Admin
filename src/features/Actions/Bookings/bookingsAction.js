import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllBookings = createAsyncThunk(
    "get/all-bookings",async({page=1},{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/bookings?page=${page}`,config); // changes the limit in the future
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

// export const deleteBookingsById = createAsyncThunk(
//     "delete/booking",async(id, {rejectWithValue})=>{
//         try {
//             const config = {
//                 headers:{
//                     "Content-Type":"application/json"
//                 }
//             }
//             const data = await axiosInstance.delete(`/api/v1/bookings`)
//         } catch (error) {
            
//         }
//     }
// )