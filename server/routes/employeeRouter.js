const Router = require('express')
const router = new Router()
const employeeController = require('../controllers/employeeController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', employeeController.getAll)
router.post('/registration', authMiddleware, employeeController.registration)
router.post('/login', employeeController.login)
router.get('/auth', authMiddleware, employeeController.check)
router.delete('/:employee_id', authMiddleware, employeeController.delete)

module.exports = router