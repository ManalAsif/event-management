import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const exists = state.users.find((user) => user.email === action.payload.email);
      if (exists) {
        state.error = "An account with this email already exists";
        return;
      }
      state.users.push(action.payload);
      state.currentUser = { name: action.payload.name, email: action.payload.email };
      state.error = "";
    },
    login: (state, action) => {
      const user = state.users.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      );
      if (!user) {
        state.error = "Incorrect email or password";
        return;
      }
      state.currentUser = { name: user.name, email: user.email };
      state.error = "";
    },
    logout: (state) => {
      state.currentUser = null;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
