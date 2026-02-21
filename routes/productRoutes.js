const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public
router.get('/', ctrl.getAll);
router.get('/featured', ctrl.getFeatured);
router.get('/spec-names', ctrl.getSpecNames);
router.get('/:id', ctrl.getById);

// Admin
router.post('/', restrictToLocalhost, verifyToken, upload.array('images', 10), ctrl.create);
router.put('/:id', restrictToLocalhost, verifyToken, upload.array('images', 10), ctrl.update);
router.delete('/:id', restrictToLocalhost, verifyToken, ctrl.remove);

module.exports = router;
