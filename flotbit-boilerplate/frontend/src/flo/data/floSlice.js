import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPages: 0,
  currentPage: 0,
  floTheme: "",
  error: null
};

const floSlice = createSlice({
  name: 'flo',
  initialState,
  reducers: {
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFloTheme: (state, action) => {
      state.floTheme = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages, setFloTheme, setError } = floSlice.actions;
export default floSlice.reducer;

