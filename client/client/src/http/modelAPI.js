import { $authHost, $host } from "./index";

// Students
export const createStudent = async (name, classId, birthDate) => {
    const { data } = await $authHost.post("api/students/", { name, classId, birthDate });
    return data;
};

export const fetchStudents = async (classId, page, limit) => {
    const { data } = await $host.get("api/students/", { params: { classId, page, limit } });
    return data;
};

export const deleteStudent = async (id) => {
    const { data } = await $authHost.delete("api/students/" + id);
    return data;
};

// Classes
export const createClass = async (name) => {
    const { data } = await $authHost.post("api/classes/", { name });
    return data;
};

export const fetchClasses = async (page, limit) => {
    const { data } = await $host.get("api/classes/", { params: { page, limit } });
    return data;
};

export const deleteClass = async (id) => {
    const { data } = await $authHost.delete("api/classes/" + id);
    return data;
};

// Meals
export const createMeal = async (name, description, price) => {
    const { data } = await $authHost.post("api/meals/", { name, description, price });
    return data;
};

export const fetchMeals = async () => {
    const { data } = await $host.get("api/meals/");
    return data;
};

export const deleteMeal = async (id) => {
    const { data } = await $authHost.delete("api/meals/" + id);
    return data;
};

// Meal Plans
export const createMealPlan = async (date, mealId) => {
    const { data } = await $authHost.post("api/mealplan/", { date, mealId });
    return data;
};

export const fetchMealPlans = async () => {
    const { data } = await $host.get("api/mealplan/");
    return data;
};

export const deleteMealPlan = async (id) => {
    const { data } = await $authHost.delete("api/mealplan/" + id);
    return data;
};

// Attendance
export const createAttendance = async (studentId, date, isPresent) => {
    const { data } = await $authHost.post("api/attendances/", { studentId, date, isPresent });
    return data;
};

export const fetchAttendance = async (studentId) => {
    const { data } = await $host.get("api/attendances/", { params: { studentId } });
    return data;
};

export const deleteAttendance = async (id) => {
    const { data } = await $authHost.delete("api/attendances/" + id);
    return data;
};

// Payments
export const createPayment = async (studentId, amount, date) => {
    const { data } = await $authHost.post("api/payments/", { studentId, amount, date });
    return data;
};

export const fetchPayments = async (studentId) => {
    const { data } = await $host.get("api/payments/", { params: { studentId } });
    return data;
};

export const deletePayment = async (id) => {
    const { data } = await $authHost.delete("api/payments/" + id);
    return data;
};

// Diet Restrictions
export const createDietRestriction = async (studentId, restriction) => {
    const { data } = await $authHost.post("api/dietRestrictions/", { studentId, restriction });
    return data;
};

export const fetchDietRestrictions = async (studentId) => {
    const { data } = await $host.get("api/dietRestrictions/", { params: { studentId } });
    return data;
};

export const deleteDietRestriction = async (id) => {
    const { data } = await $authHost.delete("api/dietRestrictions/" + id);
    return data;
};

// Student Meal Records
export const createStudentMealRecord = async (studentId, mealId, date) => {
    const { data } = await $authHost.post("api/studentMealRecords/", { studentId, mealId, date });
    return data;
};

export const fetchStudentMealRecords = async (studentId) => {
    const { data } = await $host.get("api/studentMealRecords/", { params: { studentId } });
    return data;
};

export const deleteStudentMealRecord = async (id) => {
    const { data } = await $authHost.delete("api/studentMealRecords/" + id);
    return data;
};
