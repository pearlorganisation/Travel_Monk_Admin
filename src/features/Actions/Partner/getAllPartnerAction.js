import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllPartner = createAsyncThunk(
    "get/allPartners",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/api/v1/partners`,config)
            console.log("------------partners data", data);
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

export const deletePartnerById = createAsyncThunk(
    "delete/partner",async(id,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/partners/${id}`,config)
            return data
        } catch (error) {
         if(error.response && error.response.data.message){
            return rejectWithValue(error.response.data)
         }else{
            return rejectWithValue(error.message)
         }            
        }
    }
)



/** update partner */
export const updatePartner = createAsyncThunk(
    "update/partner",async(userData, {rejectWithValue})=>{
        try {
            const { id } = userData
            console.log("the id is",id)
            const formData = new FormData
            formData.append("partnerLogo", userData
                .partnerLogo
            )

            for(const key in userData){
                if(key !== partnerLogo){
                    formData.append(key,userData[key])
                }
            }

            const {
                data
            } = await axiosInstance.put(`/api/v1/partners/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
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