import { Router } from 'express';
import  locationTypeController from '../controllers/index.js';

const router = Router();

router.get('/test', locationTypeController.locationType.test);
router.get('/', locationTypeController.locationType.getAll);
router.get('/:id', locationTypeController.locationType.getById);
router.post('/', locationTypeController.locationType.postLocationType);
router.delete('/', locationTypeController.locationType.deleteById);

export default router;
