import { createSlice } from '@reduxjs/toolkit';
import { setPage } from './studentsSlice';

const today = new Date().toISOString().split('T')[0];

const initialState = {
  attendance: [],
  selectedDate: today,
  selectedClass: "All"
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendance: (state, action) => {
      state.attendance = action.payload;
    },
    _setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    _setSelectedClass: (state, action) => {
      state.selectedClass = action.payload;
    }
  },
});

export const { setAttendance, _setSelectedDate, _setSelectedClass } = attendanceSlice.actions;

export const setSelectedDate = (date) => (dispatch) => {
  dispatch(_setSelectedDate(date));
  dispatch(setPage(1));
};

export const setSelectedClass = (className) => (dispatch) => {
  dispatch(_setSelectedClass(className));
  dispatch(setPage(1));
};

export default attendanceSlice.reducer;
