import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { Meal } = models;

const mealsController = {
    async getAllMeals(req: Request, res: Response) {
        try {
            const meals = await Meal.findAll();
            res.json(meals);
        } catch (error) {
            ApiError.internal("Failed to fetch meals.");
        }
    },

    async getMealById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const meal = await Meal.findByPk(id);

            if (!meal) {
                ApiError.badRequest("Meal not found.");
                return;
            }

            res.json(meal);
        } catch (error) {
            ApiError.internal("Failed to fetch the meal.");
        }
    },

    async createMeal(req: Request, res: Response) {
        try {
            const { name, description, price } = req.body;
            const newMeal = await Meal.create({ name, description, price });

            res.status(201).json(newMeal);
        } catch (error) {
            ApiError.internal("Failed to create the meal.");
        }
    },

    async updateMeal(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, price } = req.body;

            const meal = await Meal.findByPk(id);
            if (!meal) {
                ApiError.badRequest("Meal not found.");
                return;
            }

            await meal.update({ name, description, price });
            res.json(meal);
        } catch (error) {
            ApiError.forbidden("Failed to update the meal.");
        }
    },

    async deleteMeal(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const meal = await Meal.findByPk(id);
            if (!meal) {
                ApiError.badRequest("Meal not found.");
                return;
            }

            await meal.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete the meal.");
        }
    },
};

export default mealsController;
