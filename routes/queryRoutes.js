const router = require('express').Router();
const ctrl = require('../controllers/queryController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');

router.post('/', ctrl.create);
router.get('/', restrictToLocalhost, verifyToken, ctrl.getAll);
router.delete('/:id', restrictToLocalhost, verifyToken, ctrl.remove);
router.patch('/:id/read', restrictToLocalhost, verifyToken, ctrl.toggleRead);

module.exports = router;
