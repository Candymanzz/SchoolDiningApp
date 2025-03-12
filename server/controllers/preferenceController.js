const { Preference, Student } = require('../models/models')
const ApiError = require('../error/apiError')

class PreferenceController {
    async create(req, res, next) {
        try {
            const { student_id, dish_name } = req.body

            if (!student_id || !dish_name)
                return next(ApiError.badRequest('Student ID and dish name are required'))

            const student = await Student.findOne({ where: { student_id } })
            if (!student)
                return next(ApiError.badRequest('Incorrect student ID'))

            const preference = await Preference.create({ student_id, dish_name })
            return res.json(preference)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { preference_id } = req.params
            const preference = await Preference.findOne({ where: { preference_id } })

            if (!preference)
                return next(ApiError.badRequest('Incorrect preference ID'))

            await Preference.destroy({ where: { preference_id } })
            return res.json({ message: 'Preference deleted successfully' })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { limit, page } = req.query
        page = page || 1
        limit = limit || 10
        let offset = (page - 1) * limit

        const preferences = await Preference.findAndCountAll({ limit, offset })
        return res.json(preferences)
    }
}

module.exports = new PreferenceController()
