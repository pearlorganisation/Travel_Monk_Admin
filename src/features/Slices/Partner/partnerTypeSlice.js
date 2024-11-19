import { createSlice } from "@reduxjs/toolkit"
import { createPartnerType, getPartnerType } from "../../Actions/Partner/partnerTypeAction"
import { toast } from "sonner"
import { createPartner } from "../../Actions/Partner/AddPartnerAction/addPartnerAction"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    partner_type:{},
    addPartner:{
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    addPartnerType:{
        isLoading: false,
        isSuccess: false,
        isError: false,
    }
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
        .addCase(createPartner.pending, (state)=>{
            state.addPartner = state.addPartner ?? {};
            state.addPartner.isLoading = true;
        })
        .addCase(createPartner.rejected,(state,action)=>{
            state.addPartner = state.addPartner ?? {}
            state.addPartner.isLoading = false;
            state.addPartner.isError = true;
            state.addPartner.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(createPartner.fulfilled,(state,action)=>{
            state.addPartner = state.addPartner ?? {};
            state.addPartner.isError = false;
            state.addPartner.isSuccess = true;
            state.addPartner.isLoading = false;
            toast.success("Successfully Added Partner",{position:"top-center"})
        })
        .addCase(createPartnerType.pending,(state)=>{
            state.addPartnerType = state.addPartnerType ?? {};
            state.addPartnerType.isLoading = true;
        })
        .addCase(createPartnerType.rejected,(state,action)=>{
            state.addPartnerType = state.addPartnerType ?? {};
            state.addPartnerType.isLoading = false;
            state.addPartnerType.isError= true;
            state.addPartnerType.isSuccess= false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(createPartnerType.fulfilled,(state,action)=>{
            state.addPartnerType = state.addPartnerType ?? {};
            state.addPartnerType.isError = false;
            state.addPartnerType.isLoading = false;
            state.addPartnerType.isSuccess = true;
            toast.success("Successfuly added partner type",{position:"top-right"})
        })

    }
})

export default partner.reducer;