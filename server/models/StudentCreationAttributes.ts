import { Optional } from "sequelize";
import { StudentAttributes } from "./StudentAttributes";

export interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> { }
