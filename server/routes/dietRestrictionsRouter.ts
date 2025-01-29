import express from "express";
import dietRestrictionsController from "../controllers/dietRestrictionsController";

const router = express.Router();

router.get("/", dietRestrictionsController.getAllDietRestrictions);
router.get("/:id", dietRestrictionsController.getDietRestrictionById);
router.post("/", dietRestrictionsController.createDietRestriction);
router.put("/:id", dietRestrictionsController.updateDietRestriction);
router.delete("/:id", dietRestrictionsController.deleteDietRestriction);
router.get("/student/:studentId", dietRestrictionsController.getDietRestrictionsByStudentId);

export default router;
