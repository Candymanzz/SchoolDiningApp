import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [
  ],
  page: 1,
  totalCount: 0,
  limit: 4
};

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
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

export const { setClasses, setPage, setTotalCount, setLimit } = classesSlice.actions;
export default classesSlice.reducer;