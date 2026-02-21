const router = require('express').Router();
const ctrl = require('../controllers/userAuthController');
const { verifyUserToken, verifyToken, restrictToLocalhost } = require('../middleware/auth');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/google-login', ctrl.googleLogin);
router.get('/verify', verifyUserToken, ctrl.verify);
router.put('/update-profile', verifyUserToken, ctrl.updateProfile);
router.get('/all', restrictToLocalhost, verifyToken, ctrl.getAll);

module.exports = router;
