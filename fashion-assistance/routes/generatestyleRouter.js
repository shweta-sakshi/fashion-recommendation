import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { generatestyle, getgeneratedstyle, getimagestylemapping } from "../controllers/generatestyle.js";

const router = express.Router();

router.post("/generatestyle", authenticate, generatestyle)
router.get("/getgeneratedstyle", authenticate, getgeneratedstyle)
router.get("/getgeneratedimage", authenticate, getimagestylemapping);

export default router;