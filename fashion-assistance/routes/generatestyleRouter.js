import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { generatestyle, getgeneratedstyle } from "../controllers/generatestyle.js";

const router = express.Router();

router.post("/generatestyle", authenticate, generatestyle)
router.get("/getgeneratedstyle", authenticate, getgeneratedstyle)

export default router;