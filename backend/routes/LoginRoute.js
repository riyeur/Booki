import { Router } from 'express';
import { loginUser } from '../presentation-layer/LoginController.js';

const router = Router();

router.post('/login', loginUser);

export default router;