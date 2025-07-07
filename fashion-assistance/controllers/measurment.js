import Measurement from "../models/measurement.js";

export const createmeasurement = async (req, res) => {
  const { faceshape, gender, bodyshape, skintonecolor, region, weather } = req.body;
  if (!faceshape || !gender || !bodyshape || !skintonecolor || !region || !weather) {
    return res.status().json({ success: true, message: "every field is required" })
  }

  try {
    await Measurement.create({
      userId: req.user._id,
      faceshape,
      gender,
      bodyshape,
      skintonecolor,
      region,
      weather
    })

    return res.status(200).json({ success: true, message: "Data Saved" })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

}

export const updatemeasurment = async (req, res) => {
  const { faceshape, gender, bodyshape, skintonecolor, region, weather } = req.body;

  try {
    await Measurement.findOneAndUpdate({ userId: req.user._id }, {
      faceshape,
      gender,
      bodyshape,
      skintonecolor,
      region,
      weather
    })

    return res.status(200).json({ success: true, message: "data Updated" })

  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
}

export const getmeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ userId: req.user._id })

    if (!measurement) return res.status(404).json({ message: "measurement data not found" })
    res.status(200).json({ success: true, data: measurement, message: "successfully get measurment information." })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}