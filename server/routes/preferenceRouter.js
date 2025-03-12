const Router = require('express')
const router = new Router()
const preferenceController = require('../controllers/preferenceController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, preferenceController.create)
router.delete('/:preference_id', authMiddleware, preferenceController.delete)
router.get('/', preferenceController.getAll)

module.exports = router
