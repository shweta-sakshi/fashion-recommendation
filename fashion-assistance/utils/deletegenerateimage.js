import Stylemapping from '../models/imagestylemapping.js';

//delete generated image mapping from the database
export const deleteGeneratedImage = async (userId) => {
    try {
        
        const result = await Stylemapping.deleteOne({ userId });

        if (result.deletedCount === 0) {
            return { success: false, message: "No mapping found for userId" };
        }

        return { success: true, message: "Successfully deleted generated image mapping" };

    } catch (error) {

        return { success: false, message: "Error deleting generated image" };

    }

}
