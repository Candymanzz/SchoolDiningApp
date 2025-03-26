import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import ApiError from "../error/apiError.js";
import { Nutrition } from "../models/models.js";
import fs from 'fs';
import { Op } from 'sequelize';
import pdfTemplate from '../documents/nutritionspdf.js';
import pdf from 'html-pdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class NutritionController {
    async create(req, res, next) {
        try {
            const { name, date, type } = req.body;
            const nutrition = await Nutrition.create({ name, date, type });
            return res.json(nutrition);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { nutrition_id } = req.params;
            const nutrition = await Nutrition.findOne(
                { where: { nutrition_id: nutrition_id } },
            );
            if (!nutrition) return next(ApiError.badRequest('Incorrect nutrition id'));
            await Nutrition.destroy(
                { where: { nutrition_id: nutrition_id } },
            );
            return res.json();
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res) {
        let { dateFrom, dateTo, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = (page - 1) * limit;

        let whereClause = {};

        if (dateFrom) {
            whereClause.date = { ...whereClause.date, [Op.gte]: dateFrom };
        }
        if (dateTo) {
            whereClause.date = { ...whereClause.date, [Op.lte]: dateTo };
        }

        try {
            const nutritions = await Nutrition.findAndCountAll({
                where: whereClause,
                order: [['date', 'ASC']],
                limit,
                offset,
            });
            return res.json(nutritions);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching nutritions' });
        }
    }

    async getOne(req, res) {
        const { nutrition_id } = req.params;
        const nutrition = await Nutrition.findOne(
            { where: { nutrition_id } },
        );
        return res.json(nutrition);
    }

    async createPdf(req, res) {
        try {
            const { nutritions, participants } = req.body;

            if (!nutritions || !Array.isArray(nutritions)) {
                return res.status(400).json({
                    message: "Отсутствуют данные о питании",
                    error: "Nutritions data is required"
                });
            }

            const groupedNutritions = nutritions.reduce((acc, nutrition) => {
                const key = `${nutrition.date}_${nutrition.name}`;
                if (!acc[key]) {
                    acc[key] = {
                        ...nutrition,
                        participants: []
                    };
                }
                return acc;
            }, {});

            participants.forEach(participant => {
                nutritions.forEach(nutrition => {
                    const key = `${nutrition.date}_${nutrition.name}`;
                    if (participant.nutritionNutritionId === nutrition.nutrition_id ||
                        participant.nutritionNutritionId === nutrition.id) {
                        if (groupedNutritions[key]) {
                            groupedNutritions[key].participants.push(participant);
                        }
                    }
                });
            });

            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Отчет по питанию</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 40px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .date {
                            color: #666;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Отчет по питанию</h1>
                        <div class="date">Дата создания: ${new Date().toLocaleDateString()}</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Название</th>
                                <th>Еда</th>
                                <th>Количество питающихся</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.values(groupedNutritions).map(nutrition => `
                                <tr>
                                    <td>${new Date(nutrition.date).toLocaleDateString()}</td>
                                    <td>${nutrition.name || 'Н/Д'}</td>
                                    <td>${nutrition.type || 'Н/Д'}</td>
                                    <td>${nutrition.participants.length}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
            `;

            const options = {
                format: 'A4',
                orientation: 'portrait',
                border: '10mm',
                timeout: 30000
            };

            const pdfPath = path.join(__dirname, '..', 'nutritions.pdf');

            await new Promise((resolve, reject) => {
                pdf.create(html, options).toFile(pdfPath, (err) => {
                    if (err) {
                        console.error('Ошибка создания PDF:', err);
                        reject(err);
                    } else {
                        console.log('PDF успешно создан:', pdfPath);
                        resolve();
                    }
                });
            });

            res.status(200).json({
                message: "PDF успешно создан",
                path: pdfPath
            });

        } catch (error) {
            console.error('Ошибка при создании PDF:', error);
            res.status(500).json({
                message: "Ошибка при создании PDF",
                error: error.message
            });
        }
    }

    async getPdf(req, res) {
        try {
            const filePath = path.join(__dirname, '..', 'nutritions.pdf');

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    message: "PDF файл не найден",
                    error: "File not found"
                });
            }

            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error('Ошибка при отправке файла:', err);
                    res.status(500).json({
                        message: "Ошибка при отправке файла",
                        error: err.message
                    });
                }
            });
        } catch (error) {
            console.error('Ошибка при получении PDF:', error);
            res.status(500).json({
                message: "Ошибка при получении PDF",
                error: error.message
            });
        }
    }
}

export default new NutritionController();