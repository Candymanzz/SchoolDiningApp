import { Optional } from "sequelize";
import { ClassAttributes } from "./ClassAttributes";

export interface ClassCreationAttributes extends Optional<ClassAttributes, "id"> { }
