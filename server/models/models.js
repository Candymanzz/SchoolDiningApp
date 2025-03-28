import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Employee = sequelize.define('employee', {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Class = sequelize.define('class', {
    class_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Student = sequelize.define('student', {
    student_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false }
});

const Attendance = sequelize.define('attendance', {
    attendance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
});

const Nutrition = sequelize.define('nutrition', {
    nutrition_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false }
});

const Participant = sequelize.define('participant', {
    participant_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grade: { type: DataTypes.INTEGER, allowNull: true },
    studentStudentId: { type: DataTypes.INTEGER, allowNull: true },
    nutritionNutritionId: { type: DataTypes.INTEGER, allowNull: false },
    classClassId: { type: DataTypes.INTEGER, allowNull: true }
}, {
    indexes: [],
    unique: false
});

const Preference = sequelize.define('preference', {
    preference_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    dish_name: { type: DataTypes.STRING, allowNull: false }
});

Employee.hasOne(Class, { onDelete: 'cascade' });
Class.belongsTo(Employee);

Class.hasOne(Student, { onDelete: 'cascade' });
Student.belongsTo(Class);

Student.hasMany(Attendance, { onDelete: 'cascade' });
Attendance.belongsTo(Student);

Student.belongsToMany(Nutrition, {
    through: Participant,
    foreignKey: 'studentStudentId',
    otherKey: 'nutritionNutritionId',
    onDelete: 'cascade',
});
Nutrition.belongsToMany(Student, {
    through: Participant,
    foreignKey: 'nutritionNutritionId',
    otherKey: 'studentStudentId',
    onDelete: 'cascade',
});
Class.hasMany(Participant, {
    foreignKey: 'classClassId',
    onDelete: 'cascade'
});
Participant.belongsTo(Class, {
    foreignKey: 'classClassId'
});

Nutrition.hasMany(Participant, {
    foreignKey: 'nutritionNutritionId',
    onDelete: 'cascade'
});
Participant.belongsTo(Nutrition, {
    foreignKey: 'nutritionNutritionId'
});

Student.hasMany(Preference, {
    foreignKey: 'student_id',
    onDelete: 'cascade',
    as: 'preferences'
});
Preference.belongsTo(Student, {
    foreignKey: 'student_id',
    as: 'student'
});

export {
    Employee,
    Class,
    Student,
    Attendance,
    Nutrition,
    Participant,
    Preference
};