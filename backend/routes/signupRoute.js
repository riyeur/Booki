import express from 'express';
import SignupController from '../presentation-layer/SignupController.js';

const router = express.Router();
const signupController = new SignupController();

// POST endpoint for user registration
router.post('/signup', signupController.registerUser);

export default router;