import { createSlice } from '@reduxjs/toolkit';

// temporary
import fields from "./fields_list.json";
import builtFlo from "./build_example.json";

const initialState = {
  fields: fields,
  build: builtFlo,
  error: null
};

const floBuilderSlice = createSlice({
  name: 'floBuilder',
  initialState,
  reducers: {
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFields, setError } = floBuilderSlice.actions;
export default floBuilderSlice.reducer;

