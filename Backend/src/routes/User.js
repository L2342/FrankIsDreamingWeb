import userController from "../controllers/userController.js";
import express from "express";
import checkAuth from "../middlewares/auth.js";

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', checkAuth, userController.profile);
router.put('/update', checkAuth, userController.update);

export default router;