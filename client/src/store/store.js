import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "./employeesSlice"
import classReducer from "./classesSlice"
import studentsReducer from "./studentsSlice"
import attendanceReducer from "./attendanceSlice"
import nutritionsReducer from "./nutritionsSlice"
import participantsReducer from "./participantsSlice"
import preferencesSlice from "./preferencesSlice"

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    classes: classReducer,
    students: studentsReducer,
    attendance: attendanceReducer,
    nutritions: nutritionsReducer,
    participants: participantsReducer,
    preferences: preferencesSlice
  },
});

export default store;
