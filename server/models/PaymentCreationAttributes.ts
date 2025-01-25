import { Optional } from "sequelize";
import { PaymentAttributes } from "./PaymentAttributes";

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> { }
