import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import { uploadBase64ImageWithCallback } from "../utils/uploadImagesToImageKit.js";

export default async function main(style, modelstructure) {

    let styleinstring = ""
    for (const outfit of style) {
        styleinstring += outfit + " ";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const contents =
        `generate full image of A model with the following attributes:
    gender: ${modelstructure.gender},
    Body Shape: ${modelstructure.bodysape}, face Shape: ${modelstructure.facesape},
    Skin Tone Color: ${modelstructure.skintonecolor} who is wearing ${styleinstring}.
    The image should be realistic and suitable for fashion assistance. Give only the image without any text in response.`;

    // Set responseModalities to include "Image" so the model can generate  an image
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
    });

    let base64Image = "";

    // Check if response has the expected structure
    if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            // Based on the part type, either show the text or save the image
            if (part.text) {
                continue;
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                base64Image = imageData.toString("base64");
                break;
            }
        }
    } else {
        return { success: false, imagedata: "", message: "Unexpected response structure" };
    }

    if (base64Image) {
        const fileName = `generated-image-${Date.now()}.jpg`;

        try {
            const result = await uploadBase64ImageWithCallback(base64Image, fileName)
            return { success: true, imagedata: result.data.url, message: "Image generated and uploaded successfully" }

        } catch (error) {
            return { success: false, imagedata: "", message: "Error uploading image: " + error.message };
        }

    } else {
        return { success: false, imagedata: "", message: "No image data found in response" };
    }
}
