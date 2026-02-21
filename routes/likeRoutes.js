const router = require('express').Router();
const ctrl = require('../controllers/likeController');

router.post('/', ctrl.toggle);
router.get('/visitor/:visitorId', ctrl.getByVisitor);
router.get('/check', ctrl.check);

module.exports = router;
