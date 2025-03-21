import { Router } from 'express';
import ResultController from '../presentation-layer/ResultController.js';

const router = Router();

router.post('/result', ResultController.getGeneratedBooks);

export default router;