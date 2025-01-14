import { createSlice } from "@reduxjs/toolkit"
import { getAllBookings } from "../../Actions/Bookings/bookingsAction"
import { toast } from "sonner"

const initialState={
    isLoading: false,
    isSuccess:false,
    isError:false,
    paginate:{},
    bookingsData:{}
}

const bookingSlice = createSlice({
    name:"bookings",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllBookings.pending,state=>{
            state.isLoading= true
            state.isSuccess= false
            state.isError=false
        })
        .addCase(getAllBookings.rejected,(state,action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError=true
            state.paginate= {}
            state.bookingsData={}
            toast.error(action.payload,{position:"top-center"})
        })
        .addCase(getAllBookings.fulfilled,(state,action)=>{
            state.isLoading= false
            state.isError=false
            state.isSuccess=true
            state.paginate= action.payload.pagination
            state.bookingsData= action.payload.data
            toast.success("All data recieved",{position:"top-right"})
        })
    }
})

export default bookingSlice.reducer;