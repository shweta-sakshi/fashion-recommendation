
import Preference from '../models/preference'
export const createpreference = async (req, res) => {
    const { hairstyle, jewels, topwear, bottomwear, footwear, handbag } = req.body;

    const preference = {}
    if (hairstyle) preference.hairstyle = hairstyle;
    if (jewels) preference.jewels = jewels;
    if (topwear) preference.bottomwear = bottomwear;
    if (footwear) preference.footwear = footwear;
    if (handbag) preference.handbag = handbag;

    try {
        await Preference.create(preference)
        return res.status(200).json({ message: "preference saved" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}


export const updatepreference = async (req, res) => {
    const { hairstyle, jewels, topwear, bottomwear, footwear, handbag } = req.body;
    const preference = {}
    if (hairstyle) preference.hairstyle = hairstyle;
    if (jewels) preference.jewels = jewels;
    if (topwear) preference.bottomwear = bottomwear;
    if (footwear) preference.footwear = footwear;
    if (handbag) preference.handbag = handbag;

    try {
        await Preference.findOneAndUpdated({ userId: req.user._id }, preference);
        return res.status(200).json({ message: "user preference updated" });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getpreference = async (req, res) => {
    try {
        const preference = await findOne({userId: req.user._id})
        if(!preference) return res.status(404).json({message: "preference not found"})
        
        return res.status(200).json({data: preference, message: "preference found"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}