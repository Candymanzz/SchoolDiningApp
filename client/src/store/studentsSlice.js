import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  page: 1,
  totalCount: 0,
  limit: 10
};

const classesSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setStudents, setPage, setTotalCount, setLimit } = classesSlice.actions;
export default classesSlice.reducer;