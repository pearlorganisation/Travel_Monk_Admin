import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

/**------------------------to get all the enquiries--------------------------*/
export const getPreBuiltPackageCustomisationEnquiries = createAsyncThunk(
    "get/prebuilt-customisation-enquiries",async({page=1},{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/customization-enquiries/pre-built?page=${page}`, config)
            console.log("----------data", data)
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
/**---------------------------------this is to delete a prebuilt package enquiries-------------------------------*/
export const deletePrebuiltEnquiry = createAsyncThunk(
    "pre-built/delete", async (id, {
            rejectWithValue
        }) => {
        try {
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/customization-enquiries/pre-built/${id}`,config)
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


/**------------------------to get all the fullycustomized enquiries--------------------------------*/
export const getFullyCustomizedEnquiries = createAsyncThunk(
    "get/fully-customized-enquiries", async({page=1},{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/api/v1/customization-enquiries/fully-customize?page=${page}`, config)
            console.log('------------------data', data)
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

/**---------------------------------this is to delete a fully customized enquiries-------------------------------*/
export const deleteFullyCustomizedEnquiry = createAsyncThunk(
    "full-customized/delete", async (id, {
        rejectWithValue
    }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/customization-enquiries/fully-customize/${id}`, config)
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