import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные окружения

const sequelize = new Sequelize(
    process.env.DB_NAME, // Имя базы данных
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // Пароль
    {
        host: process.env.DB_HOST, // Хост (localhost или IP)
        port: process.env.DB_PORT, // Порт (5432 по умолчанию)
        dialect: "postgres",
    }
);

export default sequelize;
