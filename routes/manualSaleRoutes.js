const router = require('express').Router();
const ctrl = require('../controllers/manualSaleController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');

router.use(restrictToLocalhost, verifyToken);
router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
