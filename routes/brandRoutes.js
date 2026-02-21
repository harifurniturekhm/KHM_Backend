const router = require('express').Router();
const ctrl = require('../controllers/brandController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', ctrl.getAll);
router.post('/', restrictToLocalhost, verifyToken, upload.single('logo'), ctrl.create);
router.put('/:id', restrictToLocalhost, verifyToken, upload.single('logo'), ctrl.update);
router.delete('/:id', restrictToLocalhost, verifyToken, ctrl.remove);

module.exports = router;
