import express from "express"
import { getpreference, createpreference, updatepreference } from "../controllers/preference.js"
import { authenticate } from "../middlewares/auth.js"

const router = express.Router()

router.post("/", authenticate, getpreference)
router.post("/create", authenticate, createpreference)
router.post("/update", authenticate, updatepreference)

export default router