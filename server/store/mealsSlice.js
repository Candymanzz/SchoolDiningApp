import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
  },
});

export const { setMeals } = mealsSlice.actions;
export default mealsSlice.reducer;
