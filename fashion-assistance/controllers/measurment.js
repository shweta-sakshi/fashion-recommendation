import Measurement from "../models/measurement.js";

export const createmeasurement = async (req, res) => {

  const { faceshape, gender, bodyshape, skintonecolor, region, weather } = req.body;
  if (!faceshape || !gender || !bodyshape || !skintonecolor || !region || !weather) {
    return res.status().json({ message: "every field is required" })
  }

  try {
    const existingMeasurement = await Measurement.findOne({ userId: req.user._id })

    if (existingMeasurement) {
      await Measurement.findOneAndUpdate({ userId: req.user._id },
        {
          faceshape,
          gender,
          bodyshape,
          skintonecolor,
          region,
          weather
        },
        {
          new: true,
          runValidators: true
        })

      return res.status(200).json({ success: true, message: "measurement updated successfully" })
    }

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

export const getmeasurement = async (req, res) => {
  try {
    const measurement = await Measurement.findOne({ userId: req.user._id })

    if (!measurement) return res.status(404).json({ success: false, message: "measurement data not found" })
    res.status(200).json({ success: true, data: measurement, message: "successfully get measurment information." })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}