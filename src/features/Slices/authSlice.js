import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  adminLogin,
  adminLogout,
  changePassword,
  getProfileData,
  updateProfile,
} from "../Actions/authAction";

const initialState = {
  isLoading: false,
  isAdminLoggedIn: false,
  adminInfo: null,
  isError: false,
  message: null,
  isSuccess: false,
  changePasswordInfo: {
    // for changing the logged in user password
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAdminLoggedIn = false;
    },
  },
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
          position: "top-center",
        });
      }),
      builder
        .addCase(adminLogin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.adminInfo = action.payload;
          state.isSuccess = true;
          state.isError = false;
          state.isAdminLoggedIn = true;
          state.message = "";
          toast.success("Login Successful!!", {
            position: "top-center",
          });
        })
        .addCase(getProfileData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProfileData.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          toast.error(action.payload, { position: "top-center" });
        })
        .addCase(getProfileData.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isError = false;
          state.isLoading = false;
          state.adminInfo = action.payload.data;
          toast.success("Profile Data fetched", { position: "top-right" });
        })
        .addCase(updateProfile.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          toast.error(action.payload, { position: "top-center" });
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.isError = false;
          state.isSuccess = true;
          state.isLoading = false;
          toast.success("Profile Updated", { position: "top-right" });
        })
        .addCase(changePassword.pending, (state) => {
          state.changePasswordInfo = state.changePasswordInfo ?? {};
          state.changePasswordInfo.isLoading = true;
          state.changePasswordInfo.isSuccess = false;
        })
        .addCase(changePassword.rejected, (state) => {
          state.changePasswordInfo = state.changePasswordInfo ?? {};
          state.changePasswordInfo.isLoading = false;
          state.changePasswordInfo.isSuccess = false;
          state.changePasswordInfo.isError = true;
          toast.error("Failed to change the password", {
            position: "top-center",
          });
        })
        .addCase(changePassword.fulfilled, (state) => {
          state.changePasswordInfo = state.changePasswordInfo ?? {};
          state.changePasswordInfo.isError = false;
          state.changePasswordInfo.isLoading = false;
          state.changePasswordInfo.isSuccess = true;
          toast.success("Password changed successfully", {
            position: "top-right",
          });
        })
        .addCase(adminLogout.pending, (state) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = false;
        })
        .addCase(adminLogout.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
        })
        .addCase(adminLogout.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.isAdminLoggedIn = false;
          state.adminInfo = null;
          toast.success("Admin logged out successfully", {
            position: "top-right",
          });
        });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
