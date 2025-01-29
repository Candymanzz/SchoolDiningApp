import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { DietRestriction } = models;

const dietRestrictionsController = {
    async getAllDietRestrictions(req: Request, res: Response) {
        try {
            const dietRestrictions = await DietRestriction.findAll();
            res.json(dietRestrictions);
        } catch (error) {
            ApiError.internal("Failed to fetch diet restrictions.");
        }
    },

    async getDietRestrictionById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dietRestriction = await DietRestriction.findByPk(id);

            if (!dietRestriction) {
                ApiError.badRequest("Diet restriction not found.");
                return;
            }

            res.json(dietRestriction);
        } catch (error) {
            ApiError.internal("Failed to fetch the diet restriction.");
        }
    },

    async createDietRestriction(req: Request, res: Response) {
        try {
            const { studentId, restriction } = req.body;

            if (!studentId || !restriction) {
                ApiError.badRequest("Invalid input. Student ID and restriction are required.");
                return;
            }

            const newDietRestriction = await DietRestriction.create({ studentId, restriction });
            res.status(201).json(newDietRestriction);
        } catch (error) {
            ApiError.internal("Failed to create diet restriction.");
        }
    },

    async updateDietRestriction(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { restriction } = req.body;

            const dietRestriction = await DietRestriction.findByPk(id);
            if (!dietRestriction) {
                ApiError.badRequest("Diet restriction not found.");
                return;
            }

            await dietRestriction.update({ restriction });
            res.json(dietRestriction);
        } catch (error) {
            ApiError.internal("Failed to update diet restriction.");
        }
    },

    async deleteDietRestriction(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const dietRestriction = await DietRestriction.findByPk(id);
            if (!dietRestriction) {
                ApiError.badRequest("Diet restriction not found.");
                return;
            }

            await dietRestriction.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete diet restriction.");
        }
    },

    async getDietRestrictionsByStudentId(req: Request, res: Response) {
        try {
            const { studentId } = req.params;

            const dietRestrictions = await DietRestriction.findAll({ where: { studentId } });
            res.json(dietRestrictions);
        } catch (error) {
            ApiError.internal("Failed to fetch diet restrictions by student ID.");
        }
    },
};

export default dietRestrictionsController;
