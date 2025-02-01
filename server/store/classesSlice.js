import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
});

export const { setClasses } = classesSlice.actions;
export default classesSlice.reducer;
