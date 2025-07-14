import { inngest } from "../inngest/client.js";
import Stylemapping from "../models/imagestylemapping.js";
import Measurement from "../models/measurement.js"
import Preference from "../models/preference.js"
import Generatedstyle from "../models/savegeneratedstyle.js";

export const generatestyle = async (req, res) => {
    const { description } = req.body

    if (!description || description.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Description is required"
        })
    }

    try {
        const prompt = {};
        const preference = await Preference.findOne({ userId: req.user._id })
        const measurement = await Measurement.findOne({ userId: req.user._id })

        prompt.description = description
        if (preference) Object.assign(prompt, preference.toObject ? preference.toObject() : preference);
        if (measurement) Object.assign(prompt, measurement.toObject ? measurement.toObject() : measurement);

        if(!preference && !measurement){
            prompt.userId = req.user._id;
        }

        const detailedSuggestion = await inngest.send({
            name: "fasion/suggestion",
            data: prompt
        })

        return res.status(201).json({
            success: true,
            message: "Processing Started!!!",
            data: detailedSuggestion.data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
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

export const getimagestylemapping = async (req, res) => {
    try {
        const generatedstylesimage = await Stylemapping.findOne({ userId: req.user._id });

        if (!generatedstylesimage) {
            return res.status(404).json({ success: false, message: "No generated image found yet, wait a little bit" });
        }

        return res.status(200).json({ success: true, message: "Generated style fetched successfully", data: generatedstylesimage.image });

    } catch (error) {
        console.error("Error fetching generated style:", error);
        return { success: false, message: error.message };
    }
}