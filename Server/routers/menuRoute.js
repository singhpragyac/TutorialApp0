import { menuController, getAllMenuController } from "../controllers/menuController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import express from  "express";

const router = express.Router();

router.post("/create-menu", menuController);

router.get("/get-menu", getAllMenuController);


export default router;