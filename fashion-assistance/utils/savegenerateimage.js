import Stylemapping from "../models/imagestylemapping.js";

export const saveimageofstyle = async(imagestring, userId) => {
    try {

        await Stylemapping.create({
            userId: userId,
            image: imagestring,
            createdAt: new Date()
        });

        console.log("done");
        
        return { success: true, message: "Image saved successfully" };

    } catch (error) {
        console.error("Error saving image:", error);
        return { success: false, message: "Failed to save image" };
    }
}