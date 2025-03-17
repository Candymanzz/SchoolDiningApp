import ApiError from "../error/apiError.js";
import { Nutrition, Student, Class, Participant } from "../models/models.js";

class ParticipantController {
    async create(req, res, next) {
        try {
            const { studentStudentId, classClassId, nutritionNutritionId, grade } = req.body;
            if (!nutritionNutritionId)
                return next(ApiError.badRequest('No nutrition id'));
            const nutrition = await Nutrition.findOne({ where: { nutrition_id: nutritionNutritionId } });
            if (!nutrition)
                return next(ApiError.badRequest('Incorrect nutrition id'));
            if (studentStudentId) {
                const student = await Student.findOne({ where: { student_id: studentStudentId } });
                if (!student)
                    return next(ApiError.badRequest('Incorrect student id'));
            }
            if (classClassId) {
                const classx = await Class.findOne({ where: { class_id: classClassId } });
                if (!classx)
                    return next(ApiError.badRequest('Incorrect classx id'));
            }
            const participant = await Participant.create({ studentStudentId, classClassId, nutritionNutritionId, grade });

            return res.json(participant);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { participant_id } = req.params;
            const participant = await Participant.findOne(
                { where: { participant_id: participant_id } },
            );
            if (!participant)
                return next(ApiError.badRequest('Incorrect participant id'));
            await Participant.destroy(
                { where: { participant_id: participant_id } },
            );
            return res.json();
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res) {
        let { nutrition_id, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let participants;
        if (!nutrition_id) {
            participants = await Participant.findAndCountAll({ limit, offset });
        }
        if (nutrition_id) {
            participants = await Participant.findAndCountAll({ where: { nutritionNutritionId: nutrition_id }, limit, offset });
        }
        return res.json(participants);
    }
}

export default new ParticipantController();