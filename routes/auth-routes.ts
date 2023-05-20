const router = require('express').Router();

const authController = require('../controllers').auth;
const AuthMiddleware = require('../middlewares/auth');
const isAdminMiddleware = require('../middlewares/isAdmin');


router.get('/', authController.test);
router.post('/register', AuthMiddleware, isAdminMiddleware, authController.postRegister);
// router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/reset-password', authController.postRestPassword);

module.exports = router;
