import { Request, Response } from "express";
import express from "express";
import studentsController from "../controllers/studentsController";

const router = express.Router();

router.get("/", studentsController.getAllStudents);
router.get("/:id", studentsController.getStudentById);
router.post("/", studentsController.createStudent);
router.put("/:id", studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudent);
router.get("/class/:classId", studentsController.getStudentsByClassId);

export default router;
