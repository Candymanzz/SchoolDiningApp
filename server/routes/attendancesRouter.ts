import express from "express";
import attendanceController from "../controllers/attendancesController";

const router = express.Router();

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.createAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);
router.get("/student/:studentId", attendanceController.getAttendanceByStudentId);

export default router;
