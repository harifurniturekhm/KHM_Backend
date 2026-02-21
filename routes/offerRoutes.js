const router = require('express').Router();
const ctrl = require('../controllers/offerController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');

router.get('/active', ctrl.getActive);
router.get('/', restrictToLocalhost, verifyToken, ctrl.getAll);
router.post('/', restrictToLocalhost, verifyToken, ctrl.create);
router.put('/:id', restrictToLocalhost, verifyToken, ctrl.update);
router.delete('/:id', restrictToLocalhost, verifyToken, ctrl.remove);

module.exports = router;
