const router = require('express').Router();
const ctrl = require('../controllers/reviewController');
const { verifyUserToken } = require('../middleware/auth');

router.get('/:productId', ctrl.getByProduct);
router.post('/', verifyUserToken, ctrl.create);

module.exports = router;

