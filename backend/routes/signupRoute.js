import { Router } from 'express';

export default function createSignupRoute(signupController) {
    const router = Router();

    router.post('/signup', signupController.registerUser);

    return router;
}