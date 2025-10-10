import express from 'express';
import { publishComment, getComments, deleteComment } from '../controllers/commentController';
import checkAuth from '../middlewares/auth';
import { requireAdmin } from '../middlewares/requireAdmin';

const router = express.Router();

router.post('/post', checkAuth, publishComment);
router.get('/:devlogId', checkAuth, getComments);
router.delete('/:id', checkAuth, requireAdmin, deleteComment);

export default router;
