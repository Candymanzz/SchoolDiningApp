import { Optional } from "sequelize";
import { MealAttributes } from "./MealAttributes";

export interface MealCreationAttributes extends Optional<MealAttributes, "id"> { }
