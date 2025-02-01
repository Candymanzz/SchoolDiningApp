import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dietRestrictions: [],
};

const dietRestrictionsSlice = createSlice({
  name: 'dietRestrictions',
  initialState,
  reducers: {
    setDietRestrictions: (state, action) => {
      state.dietRestrictions = action.payload;
    },
  },
});

export const { setDietRestrictions } = dietRestrictionsSlice.actions;
export default dietRestrictionsSlice.reducer;
