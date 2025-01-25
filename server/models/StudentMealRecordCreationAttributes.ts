import { Optional } from "sequelize";
import { StudentMealRecordAttributes } from "./StudentMealRecordAttributes";

export interface StudentMealRecordCreationAttributes
    extends Optional<StudentMealRecordAttributes, "id"> {
}
