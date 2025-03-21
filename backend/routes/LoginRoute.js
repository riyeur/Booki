import { Router } from 'express';

export default function createLoginRoute(loginController) {
    const router = Router();

    router.post('/login', loginController.loginUser);

    return router;
}