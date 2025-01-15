import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllHotelContacts = createAsyncThunk(
    "gethotel/hotelcontacts",async({page=1},{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/contacts/hotel?page=${page}`,config)
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

/** to delete a hotel contact */

export const deleteHotelContact = createAsyncThunk(
    "delete/contact-hotel",async(id, {rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/contacts/hotel/${id}`, config)
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