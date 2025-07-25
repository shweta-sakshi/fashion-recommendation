import Generatedstyle from "../models/savegeneratedstyle.js";


const savegeneratedstyle = async (data) => {
    try {
        const newGeneratedStyle = await Generatedstyle.findOneAndUpdate({ userId: data.userId }, {
            userId: data.userId,
            summary: data.summary,
            helpfulNotes: data.helpfulNotes,
            relatedStyles: data.relatedStyles,
            createdAt: new Date(),
        }, {
            upsert: true,
            new: true,
            runValidators: true
        })

        return { success: true, message: "Generated style saved successfully", data: newGeneratedStyle };

    } catch (error) {
        console.error("Error saving generated style:", error);
        return { success: false, message: "Error saving generated style", error: error.message };
    }
}

export default savegeneratedstyle;