import { Router } from 'express';
import  siteController from '../controllers/index.js';

const router = Router();

router.get('/test', siteController.site.test);
router.get('/', siteController.site.getAll);
router.get('/:id', siteController.site.getById);
router.post('/', siteController.site.postSite);
router.delete('/', siteController.site.deleteById);

export default router;
