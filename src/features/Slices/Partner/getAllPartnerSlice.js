import { createSlice } from "@reduxjs/toolkit"
import { getAllPartner } from "../../Actions/Partner/getAllPartnerAction"
import { toast } from "sonner"

const initialState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    partner:{}
}

const partnerSlice = createSlice({
    name:"partners",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllPartner.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllPartner.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllPartner.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError= false;
            state.isSuccess= true;
            state.partner = action.payload;
            toast.success("All partners retrieved",{position:"top-right"})
        })
    }
})

export default partnerSlice.reducer;