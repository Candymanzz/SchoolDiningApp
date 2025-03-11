const Router = require('express')
const router = new Router()

const employeeRouter = require('./employeeRouter')
const classRouter = require('./classRouter')
const studentRouter = require('./studentRouter')
const attendanceRouter = require('./attendanceRouter')
const nutritionRouter = require('./nutritionRouter')
const participantRouter = require('./participantRouter')

router.use('/employee', employeeRouter)
router.use('/class', classRouter)
router.use('/student', studentRouter)
router.use('/attendance', attendanceRouter)
router.use('/nutrition', nutritionRouter)
router.use('/participant', participantRouter)

module.exports = router