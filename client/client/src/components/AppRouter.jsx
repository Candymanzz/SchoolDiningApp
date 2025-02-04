import { Routes, Route } from "react-router-dom";
import StudentList from "../pages/StudentList";
import ClassList from "../pages/ClassList";
import MealList from "../pages/MealList";
import MealPlanList from "../pages/MealPlanList";
import AttendanceList from "../pages/AttendanceList";
import PaymentList from "../pages/PaymentList";
import DietRestrictionList from "../pages/DietRestrictionList";
import StudentMealRecordList from "../pages/StudentMealRecordList";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route path="/classes" element={<ClassList />} />
            <Route path="/meals" element={<MealList />} />
            <Route path="/meal-plans" element={<MealPlanList />} />
            <Route path="/attendance" element={<AttendanceList />} />
            <Route path="/payments" element={<PaymentList />} />
            <Route path="/diet-restrictions" element={<DietRestrictionList />} />
            <Route path="/student-meal-records" element={<StudentMealRecordList />} />
            <Route path="*" element={<StudentList />} />
        </Routes>
    );
};

export default AppRouter;
