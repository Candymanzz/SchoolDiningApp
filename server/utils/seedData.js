import { Employee, Class, Student, Attendance, Nutrition, Participant, Preference } from '../models/models.js';
import bcrypt from 'bcrypt';

const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomName = () => {

    const names = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил'];
    const surnames = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Федоров'];
    return {
        name: names[Math.floor(Math.random() * names.length)],
        surname: surnames[Math.floor(Math.random() * surnames.length)]
    };
};

const generateRandomDish = () => {
    const dishes = ['Борщ', 'Суп', 'Каша', 'Пюре', 'Котлета', 'Рыба', 'Салат', 'Компот', 'Чай', 'Хлеб'];
    return dishes[Math.floor(Math.random() * dishes.length)];
};

export const seedDatabase = async () => {
    try {
        // Очищаем все таблицы в правильном порядке
        await Preference.destroy({ where: {} });
        await Participant.destroy({ where: {} });
        await Attendance.destroy({ where: {} });
        await Nutrition.destroy({ where: {} });
        await Student.destroy({ where: {} });
        await Class.destroy({ where: {} });
        await Employee.destroy({ where: {} });

        // Создаем сотрудников
        const employees = [];
        for (let i = 0; i < 50; i++) {
            const { name, surname } = generateRandomName();
            const email = `employee${i}@school.com`;
            const password = await bcrypt.hash('password123', 5);
            const position = ['Учитель', 'Повар', 'Администратор'][Math.floor(Math.random() * 3)];

            const employee = await Employee.create({
                name,
                surname,
                position,
                email,
                password
            });
            employees.push(employee);
        }

        // Создаем классы
        const classes = [];
        for (let i = 0; i < 50; i++) {
            const classData = await Class.create({
                name: `${Math.floor(Math.random() * 11) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-${i + 1}`,
                employeeEmployeeId: employees[Math.floor(Math.random() * employees.length)].employee_id
            });
            classes.push(classData);
        }

        // Создаем учеников
        const students = [];
        for (let i = 0; i < 50; i++) {
            const { name, surname } = generateRandomName();
            const student = await Student.create({
                name,
                surname,
                classClassId: classes[Math.floor(Math.random() * classes.length)].class_id
            });
            students.push(student);
        }

        // Создаем посещаемость
        for (let i = 0; i < 50; i++) {
            await Attendance.create({
                status: Math.random() > 0.2,
                date: generateRandomDate(new Date(2024, 0, 1), new Date()).toISOString().split('T')[0],
                studentStudentId: students[Math.floor(Math.random() * students.length)].student_id
            });
        }

        // Создаем питание (увеличиваем количество до 25)
        const nutritions = [];
        for (let i = 0; i < 25; i++) {
            const nutrition = await Nutrition.create({
                name: `Питание ${i + 1}`,
                date: generateRandomDate(new Date(2024, 0, 1), new Date()),
                type: ['Завтрак', 'Обед', 'Ужин'][Math.floor(Math.random() * 3)]
            });
            nutritions.push(nutrition);
        }

        // Создаем участников питания
        // Создаем массив всех возможных комбинаций питание-класс
        const combinations = [];
        for (let i = 0; i < nutritions.length; i++) {
            for (let j = i * 3; j < (i + 1) * 3 && j < classes.length; j++) {
                combinations.push({
                    nutritionId: nutritions[i].nutrition_id,
                    classId: classes[j].class_id
                });
            }
        }

        // Создаем участников на основе уникальных комбинаций
        for (const combination of combinations) {
            // Находим студентов для текущего класса
            const classStudents = students.filter(s => s.classClassId === combination.classId);

            // Берем первых двух студентов из класса
            const studentsToAdd = classStudents.slice(0, 2);

            // Создаем записи для каждого выбранного студента
            for (const student of studentsToAdd) {
                await Participant.create({
                    grade: Math.floor(Math.random() * 5) + 1,
                    studentStudentId: student.student_id,
                    nutritionNutritionId: combination.nutritionId,
                    classClassId: combination.classId
                });
            }
        }

        // Создаем предпочтения
        for (let i = 0; i < 50; i++) {
            const student = students[Math.floor(Math.random() * students.length)];
            await Preference.create({
                student_id: student.student_id,
                dish_name: generateRandomDish()
            });
        }
    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error.message);
    }
}; 