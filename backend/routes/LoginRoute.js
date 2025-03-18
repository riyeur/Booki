import { Router } from 'express';
import LoginController from '../presentation-layer/LoginController.js';

const router = Router();

router.post('/login', LoginController.loginUser);

export default router;