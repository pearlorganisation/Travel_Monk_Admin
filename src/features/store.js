import { configureStore , combineReducers} from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "../features/Slices/authSlice"
import contactsReducer from "../features/Slices/ContactSlice/ContactsSlice"
import busCruiseReducer from "../features/Slices/BusCruise/busCruiseSlice"

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
   buscruise: busCruiseReducer
})

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
