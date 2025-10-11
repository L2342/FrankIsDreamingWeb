import express from "express";
import { publishComment, getComments, deleteComment } from "../controllers/commentController";
import checkAuth from "../middlewares/auth";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = express.Router();
router.get("/:devlogId/comments", getComments);
router.post("/:devlogId/comments", checkAuth, publishComment);
router.delete("/comments/:id", checkAuth, requireAdmin, deleteComment);

export default router;
