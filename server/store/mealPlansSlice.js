import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mealPlans: [],
  selectedDate: new Date().toISOString().split('T')[0]
};

const mealPlansSlice = createSlice({
  name: 'mealPlans',
  initialState,
  reducers: {
    setMealPlans: (state, action) => {
      state.mealPlans = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    }
  },
});

export const { setMealPlans, setSelectedDate } = mealPlansSlice.actions;
export default mealPlansSlice.reducer;
