import { inngest } from "../inngest/client.js";
import Measurement from "../models/measurement.js"
import Preference from "../models/preference.js"
import Generatedstyle from "../models/savegeneratedstyle.js";

export const generatestyle = async (req, res) => {
    const { description } = req.body

    if (!description || description.trim() === "") {
        return res.status(400).json({
            message: "Description is required"
        })
    }

    console.log("Generating style with description:", description);

    try {
        const prompt = {};
        const preference = await Preference.findOne({ userId: req.user._id })
        const measurement = await Measurement.findOne({ userId: req.user._id })

        prompt.description = description
        if (preference) Object.assign(prompt, preference.toObject ? preference.toObject() : preference);
        if (measurement) Object.assign(prompt, measurement.toObject ? measurement.toObject() : measurement);

        const detailedSuggestion = await inngest.send({
            name: "fasion/suggestion",
            data: prompt
        })

        console.log("Detailed suggestion response:", detailedSuggestion);


        return res.status(201).json({
            message: "Processing Started!!!",
            data: detailedSuggestion.data
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })
    }
}

export const getgeneratedstyle = async (req, res) => {
    try {
        const generatedstyles = await Generatedstyle.findOne({ userId: req.user._id });
        
        if (!generatedstyles) {
            return res.status(404).json({
                success: false,
                message: "No generated style found yet. Please generate a style first."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Generated style fetched successfully",
            data: generatedstyles
        });

    } catch (error) {

        console.error("Error fetching generated style:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch generated style",
            error: error.message
        });

    }
}