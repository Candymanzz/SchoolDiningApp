import { Router } from "express";
import studentsRouter from "./studentsRouter";
import classesRouter from "./classesRouter";
import mealsRouter from "./mealsRouter";
import attendancesRouter from "./attendancesRouter";
import paymentsRouter from "./paymentsRouter";
import dietRestrictionsRouter from "./dietRestrictionsRouter";
import studentMealRecordsRouter from "./studentMealRecordsRouter";
import usersRouter from "./usersRouter";

const router = Router();

router.use("/students", studentsRouter);
router.use("/classes", classesRouter);
router.use("/meals", mealsRouter);
router.use("/attendances", attendancesRouter);
router.use("/payments", paymentsRouter);
router.use("/dietRestrictions", dietRestrictionsRouter);
router.use("/studentMealRecords", studentMealRecordsRouter);
router.use("/users", usersRouter);

export default router;
