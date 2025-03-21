import { Router } from 'express';

export default function createProfileRoute(profileController) {
    const router = Router();

    router.post('/bookmarks', profileController.getUserBookmarks);
    router.post('/username', profileController.getUsername);
    router.delete('/bookmarks/:bookmarkId', profileController.deleteBookmark);

    return router;
}