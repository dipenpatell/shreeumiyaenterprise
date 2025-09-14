import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tenants: [],
  loading: false,
  error: null
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenants: (state, action) => {
      state.tenants = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTenants, setError, setLoading } = tenantSlice.actions;
export default tenantSlice.reducer;