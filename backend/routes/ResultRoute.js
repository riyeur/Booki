import { Router } from 'express';

export default function createResultRoute(resultController) {
    const router = Router();

    router.post('/result', resultController.getGeneratedBooks);
    router.post('/result/:bookId', resultController.createBookmark);

    return router;
}