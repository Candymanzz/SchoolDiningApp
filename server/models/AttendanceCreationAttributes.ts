import { Optional } from "sequelize";
import { AttendanceAttributes } from "./AttendanceAttributes";

export interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, "id"> { }
