import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/Adminauth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
