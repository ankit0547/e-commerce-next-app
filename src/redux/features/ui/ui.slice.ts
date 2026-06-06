// redux/features/ui/uiSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
  loadingCount: number;
}

const initialState: UIState = {
  isLoading: false,
  loadingCount: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1;
      state.isLoading = true;
    },

    stopLoading: (state) => {
      state.loadingCount = Math.max(state.loadingCount - 1, 0);

      state.isLoading = state.loadingCount > 0;
    },

    resetLoading: (state) => {
      state.loadingCount = 0;
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading, resetLoading } = uiSlice.actions;

export default uiSlice.reducer;
