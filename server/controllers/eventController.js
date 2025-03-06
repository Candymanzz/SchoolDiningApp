const uuid = require('uuid')
const path = require('path')
const ApiError = require("../error/apiError")
const { Event } = require("../models/models")
const fs = require('fs')
const { Op } = require('sequelize');
const pdfTemplate = require('../documents/attendpdf')
const pdf = require('html-pdf')

class EventController {
    async create(req, res, next) {
        try {
            const { name, date, type } = req.body;
            let fileName = null;
    
            if (req.files && req.files.file) {
                const { file } = req.files;
                fileName = uuid.v4() + "." + file.name.substr(file.name.length - 3);
                file.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
    
            const event = await Event.create({ name, date, type, file: fileName });
    
            return res.json(event);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { event_id } = req.params
            const event = await Event.findOne(
                { where: { event_id: event_id } },
            )
            if (!event) return next(ApiError.badRequest('Incorrect event id'))
            await Event.destroy(
                { where: { event_id: event_id } },
            )
            var file_path = path.resolve(__dirname, '..', 'static', event.file)
            fs.unlink(file_path, function (err) {})
            return res.json()
        } catch (e) {
            next(ApiError.internal(e.message))
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
            const events = await Event.findAndCountAll({
                where: whereClause,
                order: [['date', 'ASC']],
                limit,
                offset,
            });
            return res.json(events);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching events' });
        }
    }
    

    async getOne(req, res) {
        const { event_id } = req.params
        const event = await Event.findOne(
            { where: { event_id } },
        )
        return res.json(event)
    }

    async createPdf(req, res) {
        pdf.create(pdfTemplate(req.body), {}).toFile("events.pdf", (err) => {
            if (err) {
                return res.status(500).json({ message: "PDF creation failed" });
            }
            res.status(200).json({ message: "PDF created successfully" });
        });
    }

    async getPdf(req, res, next) {
        try {
            const filePath = path.resolve(__dirname, '../events.pdf');
            if (!fs.existsSync(filePath)) {
                throw new Error('PDF file not found');
            }
            res.sendFile(filePath);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new EventController()