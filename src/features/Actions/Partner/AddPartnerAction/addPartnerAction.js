import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import {
    axiosInstance
} from "../../../../services/axiosInterceptor";

export const createPartner = createAsyncThunk(
    "partner/createPartner", async (userData, {
        rejectWithValue
    }) => {
        try {
            const formData = new FormData();
            formData.append("partnerLogo", userData.partnerLogo);

            for (const key in userData) {
                if (key !== "partnerLogo") {
                    formData.append(key, userData[key]);
                }
            }
            const {
                data
            } = await axiosInstance.post(`/api/v1/partners`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)