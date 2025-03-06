const Router = require('express')
const router = new Router()
const eventController = require('../controllers/eventController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, eventController.create)
router.post('/pdf', authMiddleware, eventController.createPdf)
router.get('/pdf', authMiddleware, eventController.getPdf)
router.delete('/:event_id', authMiddleware, eventController.delete)
router.get('/', eventController.getAll)
//router.get('/:event_id', eventController.getOne)

module.exports = router