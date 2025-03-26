import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  employee: {},
  isAuth: false,
  page: 1,
  totalCount: 0,
  limit: 12
};
const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
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

export const { setIsAuth, setEmployee, setEmployees, setPage, setTotalCount, setLimit } = employeesSlice.actions;
export default employeesSlice.reducer;