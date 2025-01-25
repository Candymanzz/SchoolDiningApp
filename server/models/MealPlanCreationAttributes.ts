import { Optional } from "sequelize";
import { MealPlanAttributes } from "./MealPlanAttributes";

export interface MealPlanCreationAttributes extends Optional<MealPlanAttributes, "id"> { }
