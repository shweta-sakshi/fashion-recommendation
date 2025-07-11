import ImageKit from 'imagekit';
import dotenv from "dotenv"
dotenv.config()

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Function to upload base64 image using callback (alternative approach)
export async function uploadBase64ImageWithCallback(base64Data, fileName) {
    try {
        const result = await imagekit.upload({
            file: base64Data,
            fileName: fileName,
            folder: "/fashion-recommendation/",
            useUniqueFileName: true,
            tags: ["generated", "ai-image"],
            isPublished: true
        });

        return { success: true, data: result, message: "Image uploaded successfully" };

    } catch (error) {
        return { success: false, imagedata: "", message: error.message };
    }
}