import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllHotels = createAsyncThunk(
    "get/allHotels",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
        } catch (error) {
            
        }
    }
)