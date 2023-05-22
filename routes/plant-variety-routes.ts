import { Router } from 'express';
import plantVarietyController from '../controllers/index.js';

const router = Router();

router.get('/test', plantVarietyController.plantVariety.test);
router.get('/', plantVarietyController.plantVariety.getAll);
router.get('/:id', plantVarietyController.plantVariety.getById);
router.post('/', plantVarietyController.plantVariety.postPlantVariety);
router.delete('/', plantVarietyController.plantVariety.deleteById);

export default router;
