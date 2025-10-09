import express from "express";
import devlogController from "../controllers/devlogController.js";
import checkAuth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import uploadMiddleware from "../middlewares/upload.js";
const router = express.Router();

router.post("/", checkAuth, requireAdmin, devlogController.createDevlog);
router.put("/:id", checkAuth, requireAdmin, devlogController.editDevlog);
router.get("/", checkAuth, devlogController.getDevlogs);
router.delete("/:id", checkAuth, requireAdmin, devlogController.deleteDevlog);
router.post("/:id/upload", checkAuth, requireAdmin, uploadMiddleware.array("files"), devlogController.upload);

export default router;
