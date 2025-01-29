import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError";

const { Payment } = models;

const paymentsController = {
    async getAllPayments(req: Request, res: Response) {
        try {
            const payments = await Payment.findAll();
            res.json(payments);
        } catch (error) {
            ApiError.internal("Failed to fetch the payments.");
        }
    },

    async getPaymentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const payment = await Payment.findByPk(id);

            if (!payment) {
                ApiError.badRequest("Payment not found.");
                return;
            }

            res.json(payment);
        } catch (error) {
            ApiError.internal("Failed to fetch the payment.");
        }
    },

    async createPayment(req: Request, res: Response) {
        try {
            const { studentId, amount, date } = req.body;
            const newPayment = await Payment.create({ studentId, amount, date });

            res.status(201).json(newPayment);
        } catch (error) {
            ApiError.internal("Failed to create a payment.");
        }
    },

    async updatePayment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { studentId, amount, date } = req.body;

            const payment = await Payment.findByPk(id);
            if (!payment) {
                ApiError.badRequest("Payment not found.");
                return;
            }

            await payment.update({ studentId, amount, date });
            res.json(payment);
        } catch (error) {
            ApiError.forbidden("Failed to update the payment.");
        }
    },

    async deletePayment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const payment = await Payment.findByPk(id);
            if (!payment) {
                ApiError.badRequest("Payment not found.");
                return;
            }

            await payment.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete the payment.");
        }
    },

    async getPaymentsByStudentId(req: Request, res: Response) {
        try {
            const { studentId } = req.params;

            const payments = await Payment.findAll({ where: { studentId } });
            res.json(payments);
        } catch (error) {
            ApiError.internal("Failed to fetch payments by student ID.");
        }
    },
};

export default paymentsController;
