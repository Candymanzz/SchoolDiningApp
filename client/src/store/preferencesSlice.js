import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preferences: [],
    page: 1,
    totalCount: 0,
    limit: 10
};

const preferenceSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setPreferences: (state, action) => {
            state.preferences = action.payload;
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

export const { setPreferences, setPage, setTotalCount, setLimit } = preferenceSlice.actions;
export default preferenceSlice.reducer;
