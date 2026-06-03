"use client";
import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  isLoadingProfile: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoadingProfile: (state, action) => {
      state.isLoadingProfile = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutAction, setLoadingProfile } = authSlice.actions;

export default authSlice.reducer;
