const router = require('express').Router();
const ctrl = require('../controllers/advertisementController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/active', ctrl.getActive);
router.get('/', restrictToLocalhost, verifyToken, ctrl.getAll);
router.post('/', restrictToLocalhost, verifyToken, upload.single('media'), ctrl.create);
router.patch('/:id/toggle', restrictToLocalhost, verifyToken, ctrl.toggleActive);
router.delete('/:id', restrictToLocalhost, verifyToken, ctrl.remove);

module.exports = router;
