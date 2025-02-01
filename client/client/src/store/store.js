import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsSlice";
import classesReducer from "./classesSlice";
import mealsReducer from "./mealsSlice";
import mealPlansReducer from "./mealPlansSlice";
import attendanceReducer from "./attendanceSlice";
import paymentsReducer from "./paymentsSlice";
import dietRestrictionsReducer from "./dietRestrictionsSlice";
import studentMealRecordsReducer from "./studentMealRecordsSlice";

const store = configureStore({
  reducer: {
    students: studentsReducer,
    classes: classesReducer,
    meals: mealsReducer,
    mealPlans: mealPlansReducer,
    attendance: attendanceReducer,
    payments: paymentsReducer,
    dietRestrictions: dietRestrictionsReducer,
    studentMealRecords: studentMealRecordsReducer,
  },
});

export default store;
