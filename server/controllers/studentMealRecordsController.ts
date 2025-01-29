import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { StudentMealRecord } = models;

const studentMealRecordsController = {
    async getAllRecords(req: Request, res: Response) {
        try {
            const records = await StudentMealRecord.findAll();
            res.json(records);
        } catch (error) {
            ApiError.internal("Failed to fetch student meal records.");
        }
    },

    async getRecordById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const record = await StudentMealRecord.findByPk(id);

            if (!record) {
                ApiError.badRequest("Meal record not found.");
                return;
            }

            res.json(record);
        } catch (error) {
            ApiError.internal("Failed to fetch the meal record.");
        }
    },

    async createRecord(req: Request, res: Response) {
        try {
            const { studentId, mealId, date } = req.body;
            const newRecord = await StudentMealRecord.create({ studentId, mealId, date });

            res.status(201).json(newRecord);
        } catch (error) {
            ApiError.internal("Failed to create a meal record.");
        }
    },

    async updateRecord(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { studentId, mealId, date } = req.body;

            const record = await StudentMealRecord.findByPk(id);
            if (!record) {
                ApiError.badRequest("Meal record not found.");
                return;
            }

            await record.update({ studentId, mealId, date });
            res.json(record);
        } catch (error) {
            ApiError.forbidden("Failed to update the meal record.");
        }
    },

    async deleteRecord(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const record = await StudentMealRecord.findByPk(id);
            if (!record) {
                ApiError.badRequest("Meal record not found.");
                return;
            }

            await record.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete the meal record.");
        }
    },

    async getRecordsByStudentId(req: Request, res: Response) {
        try {
            const { studentId } = req.params;

            const records = await StudentMealRecord.findAll({ where: { studentId } });
            res.json(records);
        } catch (error) {
            ApiError.internal("Failed to fetch meal records for the student.");
        }
    },
};

export default studentMealRecordsController;
