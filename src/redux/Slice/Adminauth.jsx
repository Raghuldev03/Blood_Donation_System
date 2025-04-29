import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    isLoggedIn: false,
    role: null, // 'admin', 'charity', 'donar'
    registrationNumber: "", // Add registration number to the state
    email: null,
  },
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user.isLoggedIn = true;
      state.user.role = action.payload.role;
      state.user.registrationNumber = action.payload.registrationNumber; // Store registration number
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.user.isLoggedIn = false;
      state.user.role = null;
      state.user.registrationNumber = ""; // Reset registration number on logout
      state.email = null;
    },
  },
});

export const { login, logout } = authslice.actions;
export default authslice.reducer;
