import { registration } from "./http/employeeAPI";
import { 
    createAttendance, 
    createClass, 
    createStudent, 
    createMeal, 
    createMealPlan, 
    createPayment, 
    createDietRestriction, 
    createStudentMealRecord 
} from "./http/modelAPI";

export const seeding = async () => {
    try {
        // Employees
        await registration("Владимир", "Иванов", "Учитель", "test1@gmail.com", "1234");
        await registration("Анна", "Петрова", "Учитель", "test2@gmail.com", "1234");
        await registration("Екатерина", "Сидорова", "Администратор", "admin@gmail.com", "adminpass");
        
        // Classes
        await createClass("7-A");
        await createClass("8-А");
        await createClass("9-Б");
        
        // Students
        await createStudent("Максим Егоров", 1, "2010-05-14");
        await createStudent("Анастасия Федорова", 1, "2010-06-24");
        await createStudent("Дмитрий Смирнов", 2, "2009-07-19");
        
        // Meals
        await createMeal("Завтрак", "Каша овсяная с фруктами", 150);
        await createMeal("Обед", "Суп, картофель с мясом, компот", 300);
        await createMeal("Полдник", "Йогурт и печенье", 200);
        
        // Meal Plans
        await createMealPlan("2024-12-26", 1);
        await createMealPlan("2024-12-27", 2);
        await createMealPlan("2024-12-28", 3);
        
        // Attendance
        await createAttendance(1, "2024-12-26", true);
        await createAttendance(2, "2024-12-26", false);
        await createAttendance(3, "2024-12-26", true);
        
        // Payments
        await createPayment(1, 5000, "2024-12-01");
        await createPayment(2, 5000, "2024-12-02");
        await createPayment(3, 5000, "2024-12-03");
        
        // Diet Restrictions
        await createDietRestriction(1, "Аллергия на орехи");
        await createDietRestriction(2, "Вегетарианец");
        await createDietRestriction(3, "Лактозная непереносимость");
        
        // Student Meal Records
        await createStudentMealRecord(1, 1, "2024-12-26");
        await createStudentMealRecord(2, 2, "2024-12-26");
        await createStudentMealRecord(3, 3, "2024-12-26");
    } catch (error) {
        console.error("Ошибка при заполнении базы данных", error);
        alert("Произошла ошибка при заполнении данных");
    }
};
