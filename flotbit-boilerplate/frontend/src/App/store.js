// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authentication/authSlice';
import layoutReducer from '../common/layout/layoutSlice';
import floReducer from '../flo/data/floSlice';
import floBuilderReducer from '../flo_builder/data/floBuilderSlice';
import tenantReducer from '../tenants/tenantSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    flo: floReducer,
    floBuilder: floBuilderReducer,
    tenant: tenantReducer,
  }
});
