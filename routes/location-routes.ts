import { Router } from 'express';
import  locationController from '../controllers/index.js';

const router = Router();

router.get('/test', locationController.location.test);
router.get('/', locationController.location.getAll);
router.get('/:id', locationController.location.getById);
router.post('/', locationController.location.postLocation);
router.delete('/', locationController.location.deleteById);

export default router;
