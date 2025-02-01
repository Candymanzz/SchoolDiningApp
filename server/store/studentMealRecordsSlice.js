import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentMealRecords: [],
};

const studentMealRecordsSlice = createSlice({
  name: 'studentMealRecords',
  initialState,
  reducers: {
    setStudentMealRecords: (state, action) => {
      state.studentMealRecords = action.payload;
    },
  },
});

export const { setStudentMealRecords } = studentMealRecordsSlice.actions;
export default studentMealRecordsSlice.reducer;
