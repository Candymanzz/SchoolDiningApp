import express from "express";
import studentMealRecordsController from "../controllers/studentMealRecordsController";

const router = express.Router();

router.get("/", studentMealRecordsController.getAllRecords);
router.get("/:id", studentMealRecordsController.getRecordById);
router.post("/", studentMealRecordsController.createRecord);
router.put("/:id", studentMealRecordsController.updateRecord);
router.delete("/:id", studentMealRecordsController.deleteRecord);
router.get("/student/:studentId", studentMealRecordsController.getRecordsByStudentId);

export default router;
