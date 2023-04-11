import { Router } from 'express';
import  plantController from '../controllers/index.js';

const router = Router();

router.get('/test', plantController.plant.test);
router.get('/', plantController.plant.getAll);
router.get('/:id', plantController.plant.getById);
router.post('/', plantController.plant.postPlant);
router.delete('/', plantController.plant.deleteById);

export default router;
