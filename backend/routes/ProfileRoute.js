import { Router } from 'express';
import ProfileController from '../presentation-layer/ProfileController.js';

const router = Router();

// The route sends the request to controller
router.post('/profile', ProfileController.getUserBookmarks);

export default router;