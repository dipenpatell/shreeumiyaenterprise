import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: {
    isVisible: false,
  },
  error: null
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsVisible: (state, action) => {
      state.sidebar.isVisible = Boolean(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setIsVisible, setError } = layoutSlice.actions;
export default layoutSlice.reducer;