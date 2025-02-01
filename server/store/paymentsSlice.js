import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payments: [],
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { setPayments } = paymentsSlice.actions;
export default paymentsSlice.reducer;
