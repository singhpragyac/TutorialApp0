import { tutorialController } from "../controllers/tutorialController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import express from  "express";
const router = express.Router();

router.post("/post-tutorial", authMiddleware, isAdmin, tutorialController);

export default router;