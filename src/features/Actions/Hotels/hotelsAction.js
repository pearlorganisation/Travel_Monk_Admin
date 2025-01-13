import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllHotels = createAsyncThunk(
    "get/allHotels",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data }= await axiosInstance.get(`/api/v1/hotels`,config)
            console.log('--------------------data of hotels',data)
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

/**-----------------Creating Hotel-------------------*/
export const addHotel = createAsyncThunk(
    "hotel/addHotel",
    async (hotelData, {
        rejectWithValue
    }) => {
        try {
            console.log("------------------hotel data", hotelData)
            // Extract data
            const {
                image,
                amenities,
                ...otherData
            } = hotelData;

            // Create FormData object
            const formData = new FormData();

            // Add banner
            if (image && image[0]) {
                formData.append("image", image[0]);
            }

            // Add other fields
            Object.keys(otherData).forEach((key) => {
                formData.append(key, otherData[key]);
            });

            // Add amenities names
            const amenityNames = amenities.map((amenity) => amenity.name);
            formData.append("amenitiesNames", JSON.stringify(amenityNames));

            // Add amenities icons
            // amenities.forEach((amenity) => {
            //     if (amenity.icon && amenity.icon[0]) {
            //         formData.append("amenities", amenity.icon[0]);
            //     }
            // });

            // Configure headers
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            // Send request
            const response = await axiosInstance.post(`/api/v1/hotels`,
                formData,
                config
            );

            return response.data; // Return the server response
        } catch (error) {
             if (error.response && error.response.data.message) {
                 return rejectWithValue(error.response.data.message);
             } else {
                 return rejectWithValue(error.message);
             }
        }
    }
);

/** to delete a hotel */

export const deleteHotel = createAsyncThunk(
    "delete/hotel",async(id, {rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/api/v1/hotels/${id}`,config)
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


/** update hotel  */

export const updateHotel = createAsyncThunk(
    "update/hotel",async(userData, {rejectWithValue})=>{
        try {
            const { id } = userData
            const formData = new FormData()
            formData.append("image", userData.image)
            for(const key in userData){
                if(key !== "image"){
                    formData.append(key, userData[key])
                }
            }
            const data = await axiosInstance.patch(`/api/v1/hotels/${id}`, formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
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