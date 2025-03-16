// attendanceController.js
import ApiError from "../error/apiError.js"; // Используем ES модули
import { Attendance, Student } from "../models/models.js"; // Теперь это работает
import pdfTemplate from '../documents/nutritionspdf.js'; // Используем ES модули
import pdf from 'html-pdf';
import path from 'path';
import fs from 'fs';

class AttendanceController {
    async create(req, res, next) {
        try {
            const { studentStudentId, status, date } = req.body;
            if (!studentStudentId)
                return next(ApiError.badRequest('No student id'));
            const student = await Student.findOne({ where: { student_id: studentStudentId } });
            if (!student)
                return next(ApiError.badRequest('Incorrect student id'));
            const attendance = await Attendance.create({ studentStudentId, status, date });

            return res.json(attendance);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { attendance_id } = req.params;
            const attendance = await Attendance.findOne(
                { where: { attendance_id: attendance_id } },
            );
            if (!attendance)
                return next(ApiError.badRequest('Incorrect attendance id'));
            await Attendance.destroy(
                { where: { attendance_id: attendance_id } },
            );
            return res.json();
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { student_id } = req.query;
        let attendances;
        if (!student_id) {
            attendances = await Attendance.findAndCountAll();
        }
        if (student_id) {
            attendances = await Attendance.findAndCountAll({ where: { studentStudentId: student_id } });
        }
        return res.json(attendances);
    }

    async createPdf(req, res) {
        pdf.create(pdfTemplate(req.body), {}).toFile("attendance.pdf", (err) => {
            if (err) {
                return res.status(500).json({ message: "PDF creation failed" });
            }
            res.status(200).json({ message: "PDF created successfully" });
        });
    }

    async getPdf(req, res, next) {
        try {
            const filePath = path.resolve(__dirname, '../attendance.pdf');
            if (!fs.existsSync(filePath)) {
                throw new Error('PDF file not found');
            }
            res.sendFile(filePath);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

export default new AttendanceController(); // Используем default export