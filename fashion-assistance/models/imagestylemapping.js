import mongoose from "mongoose";

const styleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    image: {type: Array},
    createdAt: {type: Date, default: Date.now},
    expiresAt: {type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000} // 24 hours expiration
});


export default mongoose.model('Stylemapping', styleSchema);