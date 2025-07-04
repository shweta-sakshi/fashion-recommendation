import express from "express"
import { createmeasurement, updatemeasurment, getmeasurement } from "../controllers/measurment.js"
import { authenticate } from "../middlewares/auth.js"

const router = express.Router()

router.post("/", authenticate, getmeasurement)
router.post("/create", authenticate, createmeasurement)
router.post("/update", authenticate, updatemeasurment)

export default router