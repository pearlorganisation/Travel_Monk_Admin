import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

/** ACTION TO GET ALL Packages */
export const getAllPackages = createAsyncThunk(
    "package/getAll", async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/api/v1/packages`,config)
            console.log('------------packages data', data)
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

/** to delete a package */
export const deletePackage = createAsyncThunk(
    "package/deletePackage", async(id,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.delete(`/api/v1/packages/${id}`,config)
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


/** To Add a Package */
export const addPackage = createAsyncThunk(
    "package/addPackage",async(userData,{rejectWithValue})=>{
        try {
            const formData = new FormData()
            formData.append("banner",userData.banner[0])
            formData.append("image",userData.image[0])
            console.log("inlcusion data",userData.inclusions)
            for(const key in userData){
                if(key !== "banner" && key !== "image"){
                    if(typeof userData[key] === "object" && userData[key] !== null){
                        formData.append(key,JSON.stringify(userData[key]))
                    }else{
                    formData.append(key,userData[key])
                }
              }
            }

            const config={
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
          const {
              data
          } = await axiosInstance.post(`/api/v1/packages`,formData,{config})
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