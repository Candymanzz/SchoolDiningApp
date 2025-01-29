import express from "express";
import paymentsController from "../controllers/paymentsController";

const router = express.Router();

router.get("/", paymentsController.getAllPayments);
router.get("/:id", paymentsController.getPaymentById);
router.post("/", paymentsController.createPayment);
router.put("/:id", paymentsController.updatePayment);
router.delete("/:id", paymentsController.deletePayment);
router.get("/student/:studentId", paymentsController.getPaymentsByStudentId);

export default router;
