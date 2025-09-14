import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: null,
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: state => { state.user = null },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAuth, setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

