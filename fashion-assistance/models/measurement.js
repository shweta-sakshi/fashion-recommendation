import mongoose from "mongoose";

const measureSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    faceshape: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    bodyshape: { type: String, required: true },
    skintonecolor: { type: String, required: true },
    region: { type: String, required: true },
    weather: { type: String, required: true }
})


export default mongoose.model("Measurement", measureSchema)