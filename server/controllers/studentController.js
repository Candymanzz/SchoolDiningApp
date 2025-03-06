const ApiError = require("../error/apiError")
const { Class, Student } = require("../models/models")

class StudentController{
    async create (req, res, next) {
        try {
            const { name, surname, classClassId } = req.body
            if (!classClassId)
                return next(ApiError.badRequest('No class id'))
            const classx = await Class.findOne({where: {class_id: classClassId}})
            if (!classx)
                return next(ApiError.badRequest('Incorrect classx id'))
            const student = await Student.create({ name, surname, classClassId })

            return res.json(student)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { student_id } = req.params
            const student = await Student.findOne(
                { where: { student_id: student_id } },
            )
            if (!student)
                return next(ApiError.badRequest('Incorrect student id'))
            await Student.destroy(
                { where: { student_id: student_id } },
            )
            return res.json()
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        let { classClassId ,limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let students
        if (!classClassId) {
            students = await Student.findAndCountAll({ limit, offset })
        }
        if (classClassId) {
            students = await Student.findAndCountAll({ where: { classClassId: classClassId }, limit, offset})
        }
        return res.json(students)
    }

    async getOne (req, res) {
        const { student_id } = req.params
        const student = await Student.findOne(
            { where: { student_id } },
        )
        return res.json(student)
    }
}

module.exports = new StudentController()