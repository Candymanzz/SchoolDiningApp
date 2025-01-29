import express from "express";
import mealsController from "../controllers/mealsController";

const router = express.Router();

router.get("/", mealsController.getAllMeals);
router.get("/:id", mealsController.getMealById);
router.post("/", mealsController.createMeal);
router.put("/:id", mealsController.updateMeal);
router.delete("/:id", mealsController.deleteMeal);

export default router;
