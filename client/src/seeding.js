import { registration } from "./http/employeeAPI"
import { createAttendance, createClass, createNutritions, createParticipant, createStudent, createPreference } from "./http/modelAPI"

export const seeding = async () => {
        const runWithErrorHandling = async (fn, ...args) => {
                try {
                        await fn(...args);
                } catch (error) {
                        console.error(`Error in ${fn.name}:`, error.message);
                }
        };

        await runWithErrorHandling(registration, "Владимир", "Иванов", "Учитель", "test1@gmail.com", "1234");
        await runWithErrorHandling(registration, "Анна", "Петрова", "Учитель", "test2@gmail.com", "1234");
        await runWithErrorHandling(registration, "Мария", "Смирнова", "Учитель", "test3@gmail.com", "1234");
        await runWithErrorHandling(registration, "Дмитрий", "Кузнецов", "Учитель", "test4@gmail.com", "1234");
        await runWithErrorHandling(registration, "Ольга", "Васильева", "Учитель", "test5@gmail.com", "1234");
        await runWithErrorHandling(registration, "Алексей", "Сидоров", "Учитель", "test6@gmail.com", "1234");
        await runWithErrorHandling(registration, "Елена", "Фролова", "Учитель", "test7@gmail.com", "1234");
        await runWithErrorHandling(registration, "Николай", "Орлов", "Учитель", "test8@gmail.com", "1234");
        await runWithErrorHandling(registration, "Татьяна", "Романова", "Учитель", "test9@gmail.com", "1234");
        await runWithErrorHandling(registration, "Андрей", "Никитин", "Учитель", "test10@gmail.com", "1234");
        await runWithErrorHandling(registration, "Светлана", "Михайлова", "Учитель", "test11@gmail.com", "1234");
        await runWithErrorHandling(registration, "Павел", "Захаров", "Учитель", "test12@gmail.com", "1234");
        await runWithErrorHandling(registration, "Ирина", "Лебедева", "Учитель", "test13@gmail.com", "1234");

        await runWithErrorHandling(createClass, "7-A", 1);
        await runWithErrorHandling(createClass, "8-А", 11);
        await runWithErrorHandling(createClass, "8-Б", 5);
        await runWithErrorHandling(createClass, "11-A", 9);
        await runWithErrorHandling(createClass, "11-Б", 7);

        await runWithErrorHandling(createStudent, "Максим", "Егоров", 1);
        await runWithErrorHandling(createStudent, "Анастасия", "Федорова", 1);
        await runWithErrorHandling(createStudent, "Илья", "Костин", 1);
        await runWithErrorHandling(createStudent, "Дарья", "Григорьева", 1);
        await runWithErrorHandling(createStudent, "Роман", "Сухов", 1);

        await runWithErrorHandling(createStudent, "Екатерина", "Алексеева", 2);
        await runWithErrorHandling(createStudent, "Владислав", "Мартынов", 2);
        await runWithErrorHandling(createStudent, "Юлия", "Тихонова", 2);

        await runWithErrorHandling(createStudent, "Артем", "Лисицын", 3);
        await runWithErrorHandling(createStudent, "Полина", "Соловьева", 3);
        await runWithErrorHandling(createStudent, "Никита", "Панкратов", 3);

        await runWithErrorHandling(createStudent, "Никита", "Котелев", 4);
        await runWithErrorHandling(createStudent, "Павел", "Далецкий", 4);
        await runWithErrorHandling(createStudent, "Александр", "Гисак", 4);
        await runWithErrorHandling(createStudent, "Роман", "Королёв", 4);

        await runWithErrorHandling(createStudent, "Денис", "Осмоловский", 5);
        await runWithErrorHandling(createStudent, "Кирилл", "Козлов", 5);
        await runWithErrorHandling(createStudent, "Константин", "Альхимович", 5);
        await runWithErrorHandling(createStudent, "Матвей", "Шаблинский", 5);
        await runWithErrorHandling(createStudent, "Тимофей", "Марков", 5);

        await runWithErrorHandling(createAttendance, 1, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 2, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 3, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 4, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 5, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 6, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 7, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 8, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 9, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 10, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 11, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 12, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 13, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 14, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 15, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 16, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 17, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 18, false, "2024-12-26");
        await runWithErrorHandling(createAttendance, 19, true, "2024-12-26");
        await runWithErrorHandling(createAttendance, 20, false, "2024-12-26");

        await runWithErrorHandling(createAttendance, 1, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 2, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 3, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 4, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 5, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 6, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 7, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 8, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 9, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 10, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 11, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 12, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 13, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 14, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 15, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 16, true, "2024-12-27");
        await runWithErrorHandling(createAttendance, 17, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 18, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 19, false, "2024-12-27");
        await runWithErrorHandling(createAttendance, 20, true, "2024-12-27");

        const formData1 = new FormData();
        formData1.append('name', "11-Б");
        formData1.append('date', "2024-12-1");
        formData1.append('type', "Драники со сметаной");
        formData1.append('file', null);
        await runWithErrorHandling(createNutritions, formData1);

        const formData2 = new FormData();
        formData2.append('name', "10-Б");
        formData2.append('date', "2024-12-2");
        formData2.append('type', "Пюре с катлетой");
        formData2.append('file', null);
        await runWithErrorHandling(createNutritions, formData2);

        const formData3 = new FormData();
        formData3.append('name', "7-А");
        formData3.append('date', "2024-12-3");
        formData3.append('type', "Суп");
        formData3.append('file', null);
        await runWithErrorHandling(createNutritions, formData3);

        const formData4 = new FormData();
        formData4.append('name', "9-А");
        formData4.append('date', "2024-12-4");
        formData4.append('type', "Пюре с катлетой");
        formData4.append('file', null);
        await runWithErrorHandling(createNutritions, formData4);

        const formData5 = new FormData();
        formData5.append('name', "8-Б");
        formData5.append('date', "2024-12-5");
        formData5.append('type', "Драники со сметаной");
        formData5.append('file', null);
        await runWithErrorHandling(createNutritions, formData5);

        const formData6 = new FormData();
        formData6.append('name', "9-А");
        formData6.append('date', "2024-12-6");
        formData6.append('type', "Каша с сосискою");
        formData6.append('file', null);
        await runWithErrorHandling(createNutritions, formData6);

        await runWithErrorHandling(createParticipant, 2, null, 1, 1);
        await runWithErrorHandling(createParticipant, 11, null, 1, 2);
        await runWithErrorHandling(createParticipant, 6, null, 1, 3);

        await runWithErrorHandling(createParticipant, null, 5, 2, null);

        await runWithErrorHandling(createParticipant, null, 1, 3, null);

        await runWithErrorHandling(createParticipant, null, 2, 4, null);
        await runWithErrorHandling(createParticipant, null, 3, 4, null);

        await runWithErrorHandling(createParticipant, 4, null, 5, 1);
        await runWithErrorHandling(createParticipant, 10, null, 5, 2);
        await runWithErrorHandling(createParticipant, 13, null, 5, 3);

        await runWithErrorHandling(createParticipant, null, 5, 6, null);
        await runWithErrorHandling(createParticipant, null, 3, 6, null);

        await runWithErrorHandling(createPreference, 1, "Пюре с котлетой");
        await runWithErrorHandling(createPreference, 2, "Суп");
        await runWithErrorHandling(createPreference, 3, "Драники со сметаной");
        await runWithErrorHandling(createPreference, 4, "Каша с сосиской");
};