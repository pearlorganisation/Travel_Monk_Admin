import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "../features/Slices/authSlice";
import contactsReducer from "../features/Slices/ContactSlice/ContactsSlice";
import busCruiseReducer from "../features/Slices/BusCruise/busCruiseSlice";
import partnerTypeReducer from "../features/Slices/Partner/partnerTypeSlice";
import userReducer from "../features/Slices/Users/getAllUsersSlice";
import partnerReducer from "../features/Slices/Partner/getAllPartnerSlice";
import packageReducer from "../features/Slices/TripPackageSlice/packageSlice";
import vehicleReducer from "../features/Slices/VehicleSlice/vehicleSlice";
import destinationReducer from "../features/Slices/DestinationSlice/destinationSlice";
import activitiesReducer from "./Slices/ActivitiesSlice/activitiesSlice";
import hotelsReducer from "../features/Slices/HotelsSlice/hotelsSlice";
import customizedTripReducer from "./Slices/CustomisationEnquiriesSlice/customisationEnquiriesSlice";
import forgotPasswordReducer from "./Slices/ForgotPasswordSlice/ForgotPasswordSlice";
import locationReducer from "./Slices/Location/locationSlice";
import bookingsReducer from "./Slices/BookingsSlice/bookingsSlice";
import hotelContactsReducer from "./Slices/HotelsSlice/hotelContactSlice";
import destinationVehicleReducer from "./Slices/DestinationVehicleSlice/destinationVehicleSlice";
import customPackageReducer from "./Slices/CustomPackage/customPackageSlice";
const persistConfig = {
  key: "Travel_Monk_Admin",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        console.log("Redux Persist Encryption Failed: ", err);
      },
    }),
  ],
  // if you do not want to persist this part of the state
  // blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  auth: authReducer,
  contact: contactsReducer,
  buscruise: busCruiseReducer,
  partnertype: partnerTypeReducer,
  users: userReducer,
  partners: partnerReducer,
  packages: packageReducer,
  vehicles: vehicleReducer,
  destinations: destinationReducer,
  hotels: hotelsReducer,
  activities: activitiesReducer,
  enquiries: customizedTripReducer,
  password: forgotPasswordReducer, // for un logged admin
  location: locationReducer,
  bookings: bookingsReducer,
  hotelcontactsData: hotelContactsReducer, // for the hotels contacts
  destination_vehicle: destinationVehicleReducer,
  customPackages: customPackageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_WORKING_ENVIRONMENT !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export default store;
