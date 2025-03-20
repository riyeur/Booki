import { Router } from 'express';
import ProfileController from '../presentation-layer/ProfileController.js';

const router = Router();

// The route sends the request to controller
router.post('/bookmarks', ProfileController.getUserBookmarks);
router.post('/username', ProfileController.getUsername);
router.delete('/bookmarks/:bookmarkId', ProfileController.deleteBookmark);

export default router;