import { Preference, Student } from '../models/models.js';
import ApiError from '../error/apiError.js';

class PreferenceController {
    async create(req, res, next) {
        try {
            const { student_id, dish_name } = req.body;

            console.log('Received data:', { student_id, dish_name });

            if (!student_id || !dish_name) {
                console.log('Student ID and dish name are required');
                return next(ApiError.badRequest('Student ID and dish name are required'));
            }

            const student = await Student.findOne({ where: { student_id } });
            if (!student) {
                console.log('Incorrect student ID:', student_id);
                return next(ApiError.badRequest('Incorrect student ID'));
            }

            const preference = await Preference.create({ student_id, dish_name });
            console.log('Preference created:', preference);

            return res.json(preference);
        } catch (e) {
            console.error('Error in create preference:', e.message);
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { preference_id } = req.params;
            const preference = await Preference.findOne({ where: { preference_id } });

            if (!preference)
                return next(ApiError.badRequest('Incorrect preference ID'));

            await Preference.destroy({ where: { preference_id } });
            return res.json({ message: 'Preference deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = (page - 1) * limit;

        const preferences = await Preference.findAndCountAll({
            include: [{
                model: Student,
                as: 'student',
                attributes: ['name', 'surname']
            }],
            limit,
            offset
        });
        return res.json(preferences);
    }
}

export default new PreferenceController(); 