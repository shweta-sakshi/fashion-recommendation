import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

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

                // Save the image file
                const buffer = Buffer.from(imageData, "base64");
                fs.writeFileSync("gemini-native-image.png", buffer);

                break;
            }
        }
    } else {
        console.error("Unexpected response structure");
        return { success: false, imagedata: "", message: "Unexpected response structure" };
    }

    if (base64Image) {
        console.log("Image generated successfully");
        return { success: true, imagedata: base64Image, message: "Image generated successfully" };
    } else {
        console.error("No image data found in response");
        return { success: false, imagedata: "", message: "No image data found in response" };
    }
}
