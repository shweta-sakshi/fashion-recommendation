import { inngest } from "../client.js"
import analyseFashion from "../../utils/ai.js";
import savegeneratedstyle from "../../utils/savegeneratedstyle.js";
import generateImage from "../../utils/textToImage.js";
import { saveimageofstyle } from "../../utils/savegenerateimage.js";

export const styleSuggestion = inngest.createFunction(
    { id: "on-style-suggestion", retries: 2 },
    { event: "fasion/suggestion" },
    async ({ event, step }) => {
        try {
            const prefer = event.data

            const aiResponse = await step.run('generate-style', () => analyseFashion(prefer))

            if (!aiResponse) {
                console.error("❌ No response from AI service")
                return { success: false, message: "No response from AI service" }
            }

            const organisedResponse = {
                userId: prefer.userId,
                summary: aiResponse.summary,
                helpfulNotes: aiResponse.helpfulNotes,
                relatedStyles: aiResponse.relatedStyles
            }

            // Save the generated style to the database
            await savegeneratedstyle(organisedResponse)

            const modelstructure = {
                bodysape: prefer.bodyShape || "any",
                facesape: prefer.faceShape || "any",
                skintonecolor: prefer.skintonecolor || "any",
                gender: prefer.gender || "according to dress style",
            }

            //generate image for the style
            const imagebase64data = await step.run("generate-image", async () => {
                const imagebase64data = [];
                for (const style of organisedResponse.relatedStyles) {
                    const imageResponse = await generateImage(style, modelstructure);

                    if (imageResponse.success) {
                        imagebase64data.push(imageResponse.imagedata.toString("base64"));
                    } else {
                        console.error("❌ Failed to generate image for style", style, imageResponse.message);
                    }
                }
                return imagebase64data;
            })

            console.log(imagebase64data);


            //save image of style
            await step.run("save-style-image", async () => {
                const response = await saveimageofstyle(imagebase64data, organisedResponse.userId)

                if (!response.success) {
                    console.error("❌ Failed to save style image", response.message);
                    return { success: false, message: "Failed to save style image" };
                }

            })


            //send mail upon assiging ticket
            // await step.run("send-email-notification", async () => {
            //     await SendMail(
            //         email,
            //         "Fashion Generated",
            //         `fashion generated for you, please check your dashboard`
            //     )
            // })

            return { success: true, data: organisedResponse, message: "Fashion style suggestion generated successfully" }

        } catch (error) {
            console.error("❌ Error running fashion pipeline ", error.message)
            return { success: false, message: "Error running fashion pipeline: " + error.message }
        }
    }
)