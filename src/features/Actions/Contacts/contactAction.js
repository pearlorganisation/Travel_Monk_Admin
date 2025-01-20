import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";



export const getAllContacts = createAsyncThunk(
    "get/allContacts", async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
        
        const { data } = await axiosInstance.get(`/api/v1/contacts`,config);
        console.log("contacts-------------------", data);
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

/** delete normal contact form */
export const deleteNormalContact = createAsyncThunk(
    "delete/contact",async(id,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"appliaction/json"
                }
            } 
            const data = await axiosInstance.delete(`/api/v1/contacts/${id}`, config )
            return data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)