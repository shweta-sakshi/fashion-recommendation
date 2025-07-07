import express from "express"
import { getpreference, createpreference } from "../controllers/preference.js"
import { authenticate } from "../middlewares/auth.js"

const router = express.Router()

router.post("/", authenticate, getpreference)
router.post("/create", authenticate, createpreference)

export default router