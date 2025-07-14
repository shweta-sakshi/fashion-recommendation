import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

import { inngest } from "../inngest/client.js"

export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed, skills })

        //fire inngest event
        await inngest.send({
            name: "user/signup",
            data: {
                email
            }
        })

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)

        res.status(200).json({success:true, user, token })

    } catch (error) {
        console.log("Signup Failed", error.message);
        res.status(500).json({ success:false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ success: false, message: "user not found" })

        bcrypt.compare(password, user.password, (err, same) => {
            if (err) {
                console.log("Compare Error ", err.message);
            }
            if (!same) return res.status(401).json({ success: false, message: "Invailid credentials" })
        })

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
        res.status(200).json({ success: true, user, token, message: "you are all set to go" })

    } catch (error) {
        console.log("login Error", error.message);
        res.status(500).json({ success: false, message: error.message })

    }
}