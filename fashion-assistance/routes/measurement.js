import express from "express"
import { createmeasurement, getmeasurement } from "../controllers/measurment.js"
import { authenticate } from "../middlewares/auth.js"

const router = express.Router()

router.post("/", authenticate, getmeasurement)
router.post("/create", authenticate, createmeasurement)

export default router