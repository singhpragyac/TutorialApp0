import { menuController, getAllMenuController } from "../controllers/menuController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
import express from  "express";

const router = express.Router();

router.post("/create-menu", formidable(), menuController);

router.get("/get-menu", getAllMenuController);


export default router;