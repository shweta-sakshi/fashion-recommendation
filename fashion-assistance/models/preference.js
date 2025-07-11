import mongoose from 'mongoose'

const preferenceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hairstyle: { type: String, default: "any" },
    jewels: { type: String, default: "no jewels" },
    topwear: { type: String, default: "any" },
    bottomwear: { type: String, default: "any" },
    footwear: { type: String, default: "any" },
    handbag: { type: String, default: "no handbags" }
})

export default mongoose.model("Preference", preferenceSchema)