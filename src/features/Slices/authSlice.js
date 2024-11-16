import {
    createSlice
} from "@reduxjs/toolkit";

import {
    PURGE
} from "redux-persist";
import {
    toast
} from "sonner";
import {
    adminLogin
} from "../Actions/authAction";

const initialState = {
    isLoading: false,
    isAdminLoggedIn: false,
    adminInfo: null,
    isError: false,
    message: null,
    isSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
            }),
            builder.addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload, {
                    position: "top-center"
                });
            }),
            builder.addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.adminInfo = action.payload;
                state.isSuccess = true;
                state.isError = false;
                state.isAdminLoggedIn = true;
                state.message = "";
                toast.success("Login Successful!!", {
                    position: "top-center"
                });
            });

        builder.addCase(PURGE, () => {
            return initialState;
        });
    },
});

export const {
    clearUser
} = authSlice.actions;
export default authSlice.reducer;
