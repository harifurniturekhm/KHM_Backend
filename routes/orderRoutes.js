const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const { verifyToken, verifyUserToken, restrictToLocalhost } = require('../middleware/auth');

router.post('/', verifyUserToken, ctrl.create);
router.get('/', restrictToLocalhost, verifyToken, ctrl.getAll);
router.patch('/:id/status', restrictToLocalhost, verifyToken, ctrl.updateStatus);

module.exports = router;

