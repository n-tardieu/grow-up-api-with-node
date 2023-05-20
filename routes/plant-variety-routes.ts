import { Router } from 'express';
import  referentialController from '../controllers/index.js';

const router = Router();

router.get('/test', referentialController.plant.test);
router.get('/', referentialController.plant.getAll);
router.get('/:id', referentialController.plant.getById);
router.post('/', referentialController.plant.postPlant);
router.delete('/', referentialController.plant.deleteById);

export default router;
