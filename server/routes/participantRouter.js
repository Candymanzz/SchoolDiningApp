const Router = require('express')
const router = new Router()
const participantController = require('../controllers/participantController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, participantController.create)
router.delete('/:participant_id', participantController.delete)
router.get('/', participantController.getAll)

module.exports = router