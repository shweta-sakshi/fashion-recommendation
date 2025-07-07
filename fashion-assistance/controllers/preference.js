
import Preference from '../models/preference.js'

export const createpreference = async (req, res) => {
    const { hairstyle, jewels, topwear, bottomwear, footwear, handbag } = req.body;

    const preference = {}
    preference.userId = req.user._id
    if (hairstyle) preference.hairstyle = hairstyle;
    if (jewels) preference.jewels = jewels;
    if (topwear) preference.bottomwear = bottomwear;
    if (footwear) preference.footwear = footwear;
    if (handbag) preference.handbag = handbag;


    try {
        const existingPreference = await Preference.findOne({ userId: req.user._id })

        if (existingPreference) {
            await Preference.findOneAndUpdate({ userId: req.user._id }, preference, {
                new: true,
                runValidators: true
            })

            return res.status(200).json({ success: true, message: "preference updated successfully" })
        }

        await Preference.create(preference)
        return res.status(200).json({ success: true, message: "preference saved" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getpreference = async (req, res) => {
    try {
        const preference = await findOne({ userId: req.user._id })
        if (!preference) return res.status(404).json({ message: "preference not found" })

        return res.status(200).json({ success: true, data: preference, message: "preference found" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}