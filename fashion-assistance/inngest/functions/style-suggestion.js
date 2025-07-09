import { inngest } from "../client.js"
import analyseTicket from "../../utils/ai.js";
import savegeneratedstyle from "../../utils/savegeneratedstyle.js";

export const styleSuggestion = inngest.createFunction(
    { id: "on-style-suggestion", retries: 2 },
    { event: "fasion/suggestion" },
    async ({ event, step }) => {
        try {
            const prefer = event.data

            const aiResponse = await analyseTicket(prefer)

            if (!aiResponse) {
                console.error("❌ No response from AI service")
                return { success: false, message: "No response from AI service" }
            }

            console.log("AI Response: ", aiResponse);
            
            const organisedResponse = {
                userId: prefer.userId,
                summary: aiResponse.summary,
                helpfulNotes: aiResponse.helpfulNotes,
                relatedStyles: aiResponse.relatedStyles
            }

            // Save the generated style to the database
            await savegeneratedstyle(organisedResponse)

            //image generation.

            console.log("image generation");

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
            return { success: false }
        }
    }
)