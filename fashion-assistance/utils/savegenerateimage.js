import Stylemapping from "../models/imagestylemapping.js";

export const saveimageofstyle = async (imagestring, userId) => {
    try {
        await Stylemapping.findOneAndUpdate({ userId }, {
            userId: userId,
            image: imagestring,
            createdAt: new Date()
        }, {
            upsert: true,
            new: true,
            runValidators: true
        });

        return { success: true, message: "Image saved successfully" };

    } catch (error) {
        console.error("Error saving image:", error);
        return { success: false, message: "Failed to save image" };
    }
}