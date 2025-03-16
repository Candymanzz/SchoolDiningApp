import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import express from 'express'; // Add this line
import sequelize from './db.js'; // Adjust the file extension if necessary
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js'; // Adjust the file extension if necessary
import errorHandler from './middleware/errorHandlingMiddleware.js'; // Adjust the file extension if necessary
import path from 'path';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

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