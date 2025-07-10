import Stylemapping from "../models/imagestylemapping.js";

export const saveimageofstyle = async (imagestring, userId) => {
    try {
        const existingstyleimagemapping = await Stylemapping.findOne({ userId: userId });

        if (existingstyleimagemapping) {
            existingstyleimagemapping.image = imagestring;
            await existingstyleimagemapping.save();
        } else {
            const newStyleMapping = new Stylemapping({
                userId: userId,
                image: imagestring
            });
            await newStyleMapping.save();
        }

        return { success: true, message: "Image saved successfully" };

    } catch (error) {
        console.error("Error saving image:", error);
        return { success: false, message: "Failed to save image" };
    }
}