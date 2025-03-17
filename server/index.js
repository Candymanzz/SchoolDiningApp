import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import express from 'express';
import sequelize from './db.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandlingMiddleware.js';
import path from 'path';
import bodyParser from 'body-parser';
import reportsRouter from './routes/reports.js'

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
app.use('/api/reports', reportsRouter);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();