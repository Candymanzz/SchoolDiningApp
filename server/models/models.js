const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
  "Student",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    classId: { type: DataTypes.INTEGER, allowNull: false },
    birthDate: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { tableName: "students" }
);

const Class = sequelize.define(
  "Class",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "classes" }
);

const Meal = sequelize.define(
  "Meal",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { tableName: "meals" }
);

const MealPlan = sequelize.define(
  "MealPlan",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    mealId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "meal_plans" }
);

const Attendance = sequelize.define(
  "Attendance",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    isPresent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { tableName: "attendance" }
);

const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { tableName: "payments" }
);

const DietRestriction = sequelize.define(
  "DietRestriction",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    restriction: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "diet_restrictions" }
);

const StudentMealRecord = sequelize.define(
  "StudentMealRecord",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    mealId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { tableName: "student_meal_records" }
);

Student.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(Student, { foreignKey: "classId" });

MealPlan.belongsTo(Meal, { foreignKey: "mealId" });
Meal.hasMany(MealPlan, { foreignKey: "mealId" });

Attendance.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(Attendance, { foreignKey: "studentId" });

Payment.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(Payment, { foreignKey: "studentId" });

DietRestriction.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(DietRestriction, { foreignKey: "studentId" });

StudentMealRecord.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(StudentMealRecord, { foreignKey: "studentId" });

StudentMealRecord.belongsTo(Meal, { foreignKey: "mealId" });
Meal.hasMany(StudentMealRecord, { foreignKey: "mealId" });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("All tables have been created.");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });

module.exports = {
  Student,
  Class,
  Meal,
  MealPlan,
  Attendance,
  Payment,
  DietRestriction,
  StudentMealRecord,
};
