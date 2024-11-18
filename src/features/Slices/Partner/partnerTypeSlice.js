import { createSlice } from "@reduxjs/toolkit"
import { getPartnerType } from "../../Actions/Partner/partnerTypeAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    partner_type:{}
}

const partner = createSlice({
    name:"partner-type",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPartnerType.pending,(state)=>{
            state.isLoading= true;
        })
        .addCase(getPartnerType.rejected,(state,action)=>{
            state,isLoading = false;
            state.isError= true;
            state.isSuccess= false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getPartnerType.fulfilled,(state,action)=>{
            state.isError= false;
            state.isLoading= false;
            state.isSuccess = true;
            state.partner_type = action.payload;
            toast.success("Retrieved the partner types",{ position:"top-right"})
        })
    }
})

export default partner.reducer;