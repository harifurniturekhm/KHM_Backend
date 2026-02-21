const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', ctrl.getAll);
router.post('/', restrictToLocalhost, verifyToken, upload.single('image'), ctrl.create);
router.put('/:id', restrictToLocalhost, verifyToken, upload.single('image'), ctrl.update);
router.delete('/:id', restrictToLocalhost, verifyToken, ctrl.remove);

module.exports = router;
