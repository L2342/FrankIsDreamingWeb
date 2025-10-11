import express from "express";
import devlogController from "../controllers/devlogController";
import checkAuth from "../middlewares/auth.js";
import {requireAdmin} from "../middlewares/requireAdmin.js";
import uploadMiddleware from "../middlewares/upload.js";
const router = express.Router();

router.post("/create", [checkAuth, requireAdmin], devlogController.createDevlog);
router.put("/edit/:id", [checkAuth, requireAdmin], devlogController.editDevlog);
router.get("/", devlogController.getDevlogs);
router.get("/:id", devlogController.getDevlogById);
router.delete("/delete/:id", [checkAuth, requireAdmin], devlogController.deleteDevlog);
router.post("/:id/upload", [checkAuth, requireAdmin, uploadMiddleware.array("files")], devlogController.upload);

export default router;
