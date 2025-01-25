import { Optional } from "sequelize";
import { DietRestrictionAttributes } from "./DietRestrictionAttributes";

export interface DietRestrictionCreationAttributes extends Optional<DietRestrictionAttributes, "id"> { }
