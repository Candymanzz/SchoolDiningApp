const Router = require('express')
const router = new Router()
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, studentController.create)
router.delete('/:student_id', authMiddleware, studentController.delete)
router.get('/', studentController.getAll)
//router.get('/:student_id', studentController.getOne)

module.exports = router