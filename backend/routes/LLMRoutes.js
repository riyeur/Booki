import { Router } from 'express';

export default function createLLMRoute(llmController) {
    const router = Router();

    router.post('/generate-books', llmController.generateBooks);

    return router;
}