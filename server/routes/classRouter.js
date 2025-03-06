const Router = require('express')
const router = new Router()
const classController = require('../controllers/classController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, classController.create)
router.delete('/:class_id', authMiddleware, classController.delete)
router.get('/', classController.getAll)

module.exports = router