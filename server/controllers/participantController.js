const ApiError = require("../error/apiError")
const { Event, Student, Class, Participant } = require("../models/models")

class ParticipantController{
    async create (req, res, next) {
        try {
            const { studentStudentId, classClassId, eventEventId, grade } = req.body
            if (!eventEventId)
                return next(ApiError.badRequest('No event id'))
            const event = await Event.findOne({where: {event_id: eventEventId}})
            if (!event)
                return next(ApiError.badRequest('Incorrect event id'))
            if (studentStudentId){
                const student = await Student.findOne({where: {student_id: studentStudentId}})
                if (!student)
                    return next(ApiError.badRequest('Incorrect student id'))
            }
            if (classClassId){
                const classx = await Class.findOne({where: {class_id: classClassId}})
                if (!classx)
                    return next(ApiError.badRequest('Incorrect classx id'))
            }
            const participant = await Participant.create({ studentStudentId, classClassId, eventEventId, grade })

            return res.json(participant)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { participant_id } = req.params
            const participant = await Participant.findOne(
                { where: { participant_id: participant_id } },
            )
            if (!participant)
                return next(ApiError.badRequest('Incorrect participant id'))
            await Participant.destroy(
                { where: { participant_id: participant_id } },
            )
            return res.json()
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll (req, res) {
        let { event_id, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let participants
        if (!event_id) {
            participants = await Participant.findAndCountAll({ limit, offset })
        }
        if (event_id) {
            participants = await Participant.findAndCountAll({ where: { eventEventId: event_id }, limit, offset })
        }
        return res.json(participants)
    }

}

module.exports = new ParticipantController()