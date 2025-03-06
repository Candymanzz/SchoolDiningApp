import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [
    ],
    selectedDateFrom: "",
    selectedDateTo: "",
    page: 1,
    totalCount: 0,
    limit: 6
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
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

export const { setEvents, setSelectedDateFrom, setSelectedDateTo, setPage, setTotalCount, setLimit } = eventsSlice.actions;
export default eventsSlice.reducer;