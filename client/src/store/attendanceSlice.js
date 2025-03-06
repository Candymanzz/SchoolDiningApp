import { createSlice } from '@reduxjs/toolkit';
import {setPage} from './studentsSlice'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

const initialState = {
  attendance: [
  ],
  selectedDate: today,
  selectedClass: "All"
};

const excursionsSlice = createSlice({
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

export const { setAttendance, _setSelectedDate, _setSelectedClass } = excursionsSlice.actions;
export const setSelectedDate = (date) => (dispatch) => {
  dispatch(_setSelectedDate(date));
  dispatch(setPage(1));
};

export const setSelectedClass = (className) => (dispatch) => {
  dispatch(_setSelectedClass(className));
  dispatch(setPage(1));
};
export default excursionsSlice.reducer;