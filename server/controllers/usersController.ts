import { Request, Response, NextFunction } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { StudentMealRecord } = models;

class StudentMealRecordController {
    async createRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentId, mealId, date } = req.body;
            if (!studentId || !mealId || !date) {
                return next(ApiError.badRequest("Missing required fields."));
            }

            const record = await StudentMealRecord.create({ studentId, mealId, date });
            return res.status(201).json(record);
        } catch (error) {
            return next(ApiError.internal("Failed to create meal record."));
        }
    }

    async getAllRecords(req: Request, res: Response, next: NextFunction) {
        try {
            const records = await StudentMealRecord.findAll();
            return res.json(records);
        } catch (error) {
            return next(ApiError.internal("Failed to fetch meal records."));
        }
    }

    async getRecordById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const record = await StudentMealRecord.findByPk(id);

            if (!record) {
                return next(ApiError.badRequest("Meal record not found."));
            }

            return res.json(record);
        } catch (error) {
            return next(ApiError.internal("Failed to fetch meal record."));
        }
    }

    async updateRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { studentId, mealId, date } = req.body;

            const record = await StudentMealRecord.findByPk(id);
            if (!record) {
                return next(ApiError.badRequest("Meal record not found."));
            }

            await record.update({ studentId, mealId, date });
            return res.json(record);
        } catch (error) {
            return next(ApiError.internal("Failed to update meal record."));
        }
    }

    async deleteRecord(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const record = await StudentMealRecord.findByPk(id);

            if (!record) {
                return next(ApiError.badRequest("Meal record not found."));
            }

            await record.destroy();
            return res.status(204).send();
        } catch (error) {
            return next(ApiError.internal("Failed to delete meal record."));
        }
    }

    async getRecordsByStudentId(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentId } = req.params;
            const records = await StudentMealRecord.findAll({ where: { studentId } });

            return res.json(records);
        } catch (error) {
            return next(ApiError.internal("Failed to fetch meal records for student."));
        }
    }
}

export default new StudentMealRecordController();
