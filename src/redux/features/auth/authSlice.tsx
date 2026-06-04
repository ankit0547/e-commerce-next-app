"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutAction, setLoading } = authSlice.actions;

export default authSlice.reducer;
