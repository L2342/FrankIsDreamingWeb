import express from 'express';
import Comment from '../models/Comments';
import { publishComment, getComments, deleteComment } from '../controllers/commentController.js';
import checkAuth from '../middlewares/auth';
import { requireAdmin } from '../middlewares/requireAdmin';

const router = express.Router();

router.post('/', checkAuth, publishComment);
router.get('/:devlogId', checkAuth, getComments);
router.delete('/:id', checkAuth, requireAdmin, deleteComment);

export default router;
