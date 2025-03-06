const {Class, Employee} = require('../models/models')
const ApiError = require('../error/apiError')


class ClassController{
    async create (req, res, next) {
        try {
            const { name, employeeEmployeeId } = req.body
            const classcheck = await Class.findOne({where: {name: name}})
            if (classcheck)
                return next(ApiError.badRequest('Class already exists'))
            if (!employeeEmployeeId)
                return next(ApiError.badRequest('No employee id'))
            const employee = await Employee.findOne({where: {employee_id: employeeEmployeeId}})
            if (!employee)
                return next(ApiError.badRequest('Incorrect employee id'))
            const classx = await Class.create({ name, employeeEmployeeId})

            return res.json(classx)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { class_id } = req.params
            const classx = await Class.findOne(
                { where: { class_id: class_id } },
            )
            if (!classx)
                return next(ApiError.badRequest('Incorrect class id'))
            await Class.destroy(
                { where: { class_id: class_id } },
            )
            return res.json()
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        let { limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let classes = await Class.findAndCountAll({ limit, offset })
        return res.json(classes)
    }

}

module.exports = new ClassController()