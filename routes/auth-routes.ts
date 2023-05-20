import { Router } from 'express';

import authController from '../controllers/index.js';

import AuthMiddleware from '../middlewares/auth.js';
import isAdminMiddleware from '../middlewares/isAuth.js';

const router = Router();


router.get('/', authController.auth.test);
router.post('/register', AuthMiddleware, isAdminMiddleware, authController.auth.postRegister);
// router.post('/register', authController.auth.postRegister);
router.post('/login', authController.auth.postLogin);
router.post('/reset-password', authController.auth.postRestPassword);

export default router;
