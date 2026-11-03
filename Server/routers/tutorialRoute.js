import { tutorialController, getAllTutorialController} from "../controllers/tutorialController.js";
import express from  "express";
const router = express.Router();

router.post("/post-tutorial",tutorialController);

router.get("/get-tutorial", getAllTutorialController);

export default router;