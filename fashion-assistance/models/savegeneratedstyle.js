import mongoose from "mongoose";

const generatedStyleSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    summary: {type: String, required: true},
    helpfulNotes: {type: String, required: true},
    relatedStyles: {type: Array, required: true},
    createdAt: {type: Date, default: Date.now},
    expiresAt: {type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000} // 24 hours expiration
});

export default mongoose.model('Generatedstyle', generatedStyleSchema);