import { Router } from 'express';
import ResultController from '../presentation-layer/ResultController.js';

const router = Router();

router.post('/result', ResultController.getGeneratedBooks);
router.post('/result/:bookId', ResultController.createBookmark);

export default router;