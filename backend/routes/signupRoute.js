import { Router } from 'express';
import SignupController from '../presentation-layer/SignupController.js';

const router = Router();

router.post('/signup', SignupController.registerUser);

export default router;