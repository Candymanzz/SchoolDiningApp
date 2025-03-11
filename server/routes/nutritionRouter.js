const Router = require('express')
const router = new Router()
const nutritionController = require('../controllers/nutritionController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, nutritionController.create)
router.post('/pdf', authMiddleware, nutritionController.createPdf)
router.get('/pdf', authMiddleware, nutritionController.getPdf)
router.delete('/:nutrition_id', authMiddleware, nutritionController.delete)
router.get('/', nutritionController.getAll)
//router.get('/:nutrition_id', nutritionController.getOne)

module.exports = router