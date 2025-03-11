import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nutritions: [
    ],
    selectedDateFrom: "",
    selectedDateTo: "",
    page: 1,
    totalCount: 0,
    limit: 6
};

const nutritionsSlice = createSlice({
    name: 'nutritions',
    initialState,
    reducers: {
        setNutritions: (state, action) => {
            state.nutritions = action.payload;
        },
        setSelectedDateFrom: (state, action) => {
            state.selectedDateFrom = action.payload;
            state.page = 1;
        },
        setSelectedDateTo: (state, action) => {
            state.selectedDateTo = action.payload;
            state.page = 1;
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

export const { setNutritions, setSelectedDateFrom, setSelectedDateTo, setPage, setTotalCount, setLimit } = nutritionsSlice.actions;
export default nutritionsSlice.reducer;