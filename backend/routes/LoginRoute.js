import { Router } from 'express';
import LoginController from '../presentation-layer/LoginController.js';

const router = Router();

// The route sends the request to controller
router.post('/login', LoginController.loginUser);

export default router;