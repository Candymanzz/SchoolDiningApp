import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { Class } = models;

const classesController = {
    async getAllClasses(req: Request, res: Response) {
        try {
            const classes = await Class.findAll();
            res.json(classes);
        } catch (error) {
            ApiError.internal("Failed to fetch the classes.");
        }
    },

    async getClassById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const classItem = await Class.findByPk(id);

            if (!classItem) {
                ApiError.badRequest("Class not found.");
            }

            res.json(classItem);
        } catch (error) {
            ApiError.internal("Failed to fetch the class.");
        }
    },

    async createClass(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const newClass = await Class.create({ name });

            res.status(201).json(newClass);
        } catch (error) {
            ApiError.internal("Failed to create a class.");
        }
    },

    async updateClass(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const classItem = await Class.findByPk(id);
            if (!classItem) {
                ApiError.badRequest("Class not found.");
                return;
            }

            await classItem.update({ name });
            res.json(classItem);
        } catch (error) {
            ApiError.forbidden("Failed to update the class.");
        }
    },

    async deleteClass(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const classItem = await Class.findByPk(id);
            if (!classItem) {
                ApiError.badRequest("Class not found.");
                return;
            }

            await classItem.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete the class.");
        }
    },
};

export default classesController;
