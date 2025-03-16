import { v4 as uuidv4 } from 'uuid'; // Используем named export
import path from 'path';
import ApiError from "../error/apiError.js"; // Используем ES модули
import { Nutrition } from "../models/models.js"; // Используем ES модули
import fs from 'fs';
import { Op } from 'sequelize';
import pdfTemplate from '../documents/attendpdf.js'; // Используем ES модули
import pdf from 'html-pdf';

class NutritionController {
    async create(req, res, next) {
        try {
            const { name, date, type } = req.body;
            let fileName = null;

            if (req.files && req.files.file) {
                const { file } = req.files;
                fileName = uuidv4() + "." + file.name.substr(file.name.length - 3); // Используем uuidv4
                file.mv(path.resolve(__dirname, '..', 'static', fileName));
            }

            const nutrition = await Nutrition.create({ name, date, type, file: fileName });

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
            const file_path = path.resolve(__dirname, '..', 'static', nutrition.file);
            fs.unlink(file_path, function (err) { });
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
        pdf.create(pdfTemplate(req.body), {}).toFile("nutritions.pdf", (err) => {
            if (err) {
                return res.status(500).json({ message: "PDF creation failed" });
            }
            res.status(200).json({ message: "PDF created successfully" });
        });
    }

    async getPdf(req, res, next) {
        try {
            const filePath = path.resolve(__dirname, '../nutritions.pdf');
            if (!fs.existsSync(filePath)) {
                throw new Error('PDF file not found');
            }
            res.sendFile(filePath);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

export default new NutritionController(); // Используем default export