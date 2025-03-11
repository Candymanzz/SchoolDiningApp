import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    participants: [
        // { participant_id: 1, grade: 10, studentStudentId: null, classClassId: 1, nutritionNutritionId: 1 },
        // { participant_id: 2, grade: 10, studentStudentId: null, classClassId: 1, nutritionNutritionId: 2 },
        // { participant_id: 3, grade: 10, studentStudentId: 1, classClassId: null, nutritionNutritionId: 3 },
        // { participant_id: 4, grade: 10, studentStudentId: 2, classClassId: null, nutritionNutritionId: 4 },
        // { participant_id: 5, grade: 10, studentStudentId: 1, classClassId: null, nutritionNutritionId: 5 },
        // { participant_id: 6, grade: 10, studentStudentId: null, classClassId: 1, nutritionNutritionId: 6 },
        // { participant_id: 7, grade: 10, studentStudentId: 2, classClassId: null, nutritionNutritionId: 7 },
        // { participant_id: 8, grade: 5, studentStudentId: 2, classClassId: null, nutritionNutritionId: 5 },
        // { participant_id: 9, grade: 5, studentStudentId: 1, classClassId: null, nutritionNutritionId: 7 },
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