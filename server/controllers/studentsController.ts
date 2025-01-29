import { Request, Response } from "express";
import models from "../models/models";
import { ApiError } from "../error/apiError"

const { Student } = models;

const studentsController = {
    async getAllStudents(req: Request, res: Response) {
        try {
            const students = await Student.findAll();
            res.json(students);
        } catch (error) {
            ApiError.internal("Failed to fetch the students.")
        }
    },

    async getStudentById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const student = await Student.findByPk(id);

            if (!student) {
                ApiError.badRequest("Student not found.");
            }

            res.json(student);
        } catch (error) {
            ApiError.internal("Failed to fetch the student.");
        }
    },

    async createStudent(req: Request, res: Response) {
        try {
            const { name, classId, birthDate } = req.body;
            const newStudent = await Student.create({ name, classId, birthDate });

            res.status(201).json(newStudent);
        } catch (error) {
            ApiError.internal("Failed to create a student.");
        }
    },

    async updateStudent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, classId, birthDate } = req.body;

            const student = await Student.findByPk(id);
            if (!student) {
                ApiError.badRequest("Student not found.");
                return;
            }

            await student.update({ name, classId, birthDate });
            res.json(student);
        } catch (error) {
            ApiError.forbidden("Failed to update the student.");
        }
    },

    async deleteStudent(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const student = await Student.findByPk(id);
            if (!student) {
                ApiError.badRequest("Student not found.");
                return;
            }

            await student.destroy();
            res.status(204).send();
        } catch (error) {
            ApiError.internal("Failed to delete the student.");
        }
    },

    async getStudentsByClassId(req: Request, res: Response) {
        try {
            const { classId } = req.params;

            const students = await Student.findAll({ where: { classId } });
            res.json(students);
        } catch (error) {
            ApiError.internal("Failed to fetch students by class ID.");
        }
    },
};

export default studentsController;
