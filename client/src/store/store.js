import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "./employeesSlice"
import classReducer from "./classesSlice"
import studentsReducer from "./studentsSlice"
import attendanceReducer from "./attendanceSlice"
import eventsReducer from "./eventsSlice"
import participantsReducer from "./participantsSlice"

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    classes: classReducer,
    students: studentsReducer,
    attendance: attendanceReducer,
    events: eventsReducer,
    participants: participantsReducer
  },
});

export default store;
