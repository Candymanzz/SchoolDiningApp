import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { StudentAttributes } from "./StudentAttributes";
import { StudentCreationAttributes } from "./StudentCreationAttributes";
import { ClassAttributes } from "./ClassAttributes";
import { ClassCreationAttributes } from "./ClassCreationAttributes";
import { MealAttributes } from "./MealAttributes";
import { MealCreationAttributes } from "./MealCreationAttributes";
import { MealPlanAttributes } from "./MealPlanAttributes";
import { MealPlanCreationAttributes } from "./MealPlanCreationAttributes";
import { AttendanceAttributes } from "./AttendanceAttributes";
import { AttendanceCreationAttributes } from "./AttendanceCreationAttributes";
import { PaymentAttributes } from "./PaymentAttributes";
import { PaymentCreationAttributes } from "./PaymentCreationAttributes";
import { DietRestrictionAttributes } from "./DietRestrictionAttributes";
import { DietRestrictionCreationAttributes } from "./DietRestrictionCreationAttributes";
import { StudentMealRecordAttributes } from "./StudentMealRecordAttributes";
import { StudentMealRecordCreationAttributes } from "./StudentMealRecordCreationAttributes";

const Student = sequelize.define<Model<StudentAttributes, StudentCreationAttributes>>(
  "Student",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    classId: { type: DataTypes.INTEGER, allowNull: false },
    birthDate: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { tableName: "students" }
);

const Class = sequelize.define<Model<ClassAttributes, ClassCreationAttributes>>(
  "Class",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "classes" }
);

const Meal = sequelize.define<Model<MealAttributes, MealCreationAttributes>>(
  "Meal",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { tableName: "meals" }
);

const MealPlan = sequelize.define<Model<MealPlanAttributes, MealPlanCreationAttributes>>(
  "MealPlan",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    mealId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "meal_plans" }
);

const Attendance = sequelize.define<Model<AttendanceAttributes, AttendanceCreationAttributes>>(
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

const Payment = sequelize.define<Model<PaymentAttributes, PaymentCreationAttributes>>(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { tableName: "payments" }
);

const DietRestriction = sequelize.define<Model<DietRestrictionAttributes, DietRestrictionCreationAttributes>>(
  "DietRestriction",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    restriction: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "diet_restrictions" }
);

const StudentMealRecord = sequelize.define<Model<StudentMealRecordAttributes, StudentMealRecordCreationAttributes>>(
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

export default {
  Student,
  Class,
  Meal,
  MealPlan,
  Attendance,
  Payment,
  DietRestriction,
  StudentMealRecord,
};
