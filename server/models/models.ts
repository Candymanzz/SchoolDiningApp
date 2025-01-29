import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Student extends Model { }
Student.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    classId: { type: DataTypes.INTEGER, allowNull: false },
    birthDate: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, tableName: "students" }
);

class Class extends Model { }
Class.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "classes" }
);

class Meal extends Model { }
Meal.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: "meals" }
);

class MealPlan extends Model { }
MealPlan.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    mealId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "meal_plans" }
);

class Attendance extends Model { }
Attendance.init(
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
  { sequelize, tableName: "attendance" }
);

class Payment extends Model { }
Payment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, tableName: "payments" }
);

class DietRestriction extends Model { }
DietRestriction.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    restriction: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "diet_restrictions" }
);

class StudentMealRecord extends Model { }
StudentMealRecord.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    mealId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, tableName: "student_meal_records" }
);

// Relations
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

// Sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("All tables have been created.");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });

const models = {
  Student,
  Class,
  Meal,
  MealPlan,
  Attendance,
  Payment,
  DietRestriction,
  StudentMealRecord,
};

export default models;