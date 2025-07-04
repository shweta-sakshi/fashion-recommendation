import { inngest } from "../client.js"
import analyseTicket from "../../utils/ai.js";

export const styleSuggestion = inngest.createFunction(
    { id: "on-style-suggestion", retries: 2 },
    { event: "fasion/suggestion" },
    async ({ event, step }) => {
        try {
            const { prompt } = event.data
            const aiResponse = await analyseTicket(prompt)

            localStorage.setItem('fashion', aiResponse)

            //image generation.

            console.log("image generation");

            //send mail upon assiging ticket
            await step.run("send-email-notification", async () => {
                await SendMail(
                    moderator.email,
                    "Ticket Assogned",
                    `A new ticket is assigned to you ${finalTicket.title}`
                )
            })

            return { success: true }

        } catch (error) {
            console.error("❌ Error running ticket pipeline ", error.message)
            return { success: false }
        }
    }
)