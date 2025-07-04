import { inngest } from "../inngest/client";
import Measurement from "../models/measurement"
import Preference from "../models/preference"

export const suggestdesign = async () => {
    const { description } = req.body

    try {
        const prompt = {};
        const preference = await Preference.findOne({ userId: req.user._id })
        const measurement = await Measurement.findOne({ userId: req.user._id })

        prompt.description = description
        if (preference) Object.assign(prompt, preference.toObject ? preference.toObject() : preference);
        if (measurement) Object.assign(prompt, measurement.toObject ? measurement.toObject() : measurement);

        await inngest.send({
            name: "fasion/suggestion",
            data: prompt
        })

        return res.status(201).json({
            message: "Processing Started!!!",
            yourDetail: prompt
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })
    }
}