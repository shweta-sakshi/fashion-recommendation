import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { serve } from "inngest/express"
import userRoutes from "./routes/user.js"
import preferenceRoutes from './routes/preference.js'
import measurementRoutes from './routes/measurement.js'
import generatestyleRouter from './routes/generatestyleRouter.js'
import { inngest } from "./inngest/client.js"
import { onUserSignUp } from "./inngest/functions/on-signup.js"
import { styleSuggestion } from './inngest/functions/style-suggestion.js'

import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 8000
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/preference", preferenceRoutes);
app.use("/api/measurement", measurementRoutes);
app.use("/api/ai", generatestyleRouter);

app.use("/api/inngest", serve({
    client: inngest,
    functions: [onUserSignUp, styleSuggestion]
}))

mongoose
    .connect(process.env.DB)
    .then(() => {
        console.log("mongoose connected ✅");
        app.listen(port, () => console.log("🚀 server listening at port ", port));
    })
    .catch((err) => console.error("❌mongodb Error: ", err));