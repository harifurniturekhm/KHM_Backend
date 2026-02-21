const router = require('express').Router();
const { login, verify } = require('../controllers/authController');
const { verifyToken, restrictToLocalhost } = require('../middleware/auth');

router.post('/login', restrictToLocalhost, login);
router.get('/verify', restrictToLocalhost, verifyToken, verify);

module.exports = router;
