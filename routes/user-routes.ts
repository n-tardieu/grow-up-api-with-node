import { Router } from 'express';
import  userController from '../controllers/index.js';

const router = Router();

router.get('/test', userController.user.test);
router.get('/', userController.user.getAll);
router.get('/:id', userController.user.getById);
router.post('/', userController.user.postUser);
router.delete('/', userController.user.deleteById);

export default router;
