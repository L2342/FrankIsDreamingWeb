import userController from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.get('/register', userController.register);

export default router;