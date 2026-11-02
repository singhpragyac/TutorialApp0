import express from "express";
import { registerController, logginController, getProfileController} from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", logginController);

router.get("/profile", authMiddleware, getProfileController);

export default router;