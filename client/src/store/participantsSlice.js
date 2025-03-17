import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    participants: [
    ]
};

const participantsSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
        setParticipants: (state, action) => {
            state.participants = action.payload;
        }
    },
});

export const { setParticipants } = participantsSlice.actions;
export default participantsSlice.reducer;