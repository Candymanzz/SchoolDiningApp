import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { Attendance, Student } = models;

const attendanceController = {
    async getAllAttendance(req: Request, res: Response) {
        try {
            const attendanceRecords = await Attendance.findAll({
                include: [{ model: Student, as: "student" }], // Включение информации о студенте
            });
            res.json(attendanceRecords);
        } catch (error) {
            ApiError.internal("Failed to fetch attendance records.");
        }
    },

    async getAttendanceById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const attendanceRecord = await Attendance.findByPk(id, {
                include: [{ model: Student, as: "student" }],
            });

            if (!attendanceRecord) {
                ApiError.badRequest("Attendance record not found.");
                return;
            }

            res.json(attendanceRecord);
        } catch (error) {
            ApiError.internal("Failed to fetch the attendance record.");
        }
    },

    async createAttendance(req: Request, res: Response) {
        try {
            const { studentId, date, isPresent } = req.body;
            const newAttendance = await Attendance.create({
                studentId,
                date,
                isPresent,
            });

            res.status(201).json(newAttendance);
        } catch (error) {
            ApiError.internal("Failed to create attendance record.");
        }
    },

    async updateAttendance(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { studentId, date, isPresent } = req.body;

            const attendanceRecord = await Attendance.findByPk(id);
            if (!attendanceRecord) {
                ApiError.badRequest("Attendance record not found.");
                return;
            }

            await attendanceRecord.update({ studentId, date, isPresent });
            res.json(attendanceRecord);
        } catch (error) {
            ApiError.internal("Failed to update attendance record.");
        }
    },

    async deleteAttendance(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const attendanceRecord = await Attendance.findByPk(id);
            if (!attendanceRecord) {
                ApiError.badRequest("Attendance record not found.");
                return;
            }

            await attendanceRecord.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete attendance record.");
        }
    },

    async getAttendanceByStudentId(req: Request, res: Response) {
        try {
            const { studentId } = req.params;

            const attendanceRecords = await Attendance.findAll({
                where: { studentId },
                include: [{ model: Student, as: "student" }],
            });

            res.json(attendanceRecords);
        } catch (error) {
            ApiError.internal("Failed to fetch attendance records for the student.");
        }
    },
};

export default attendanceController;
