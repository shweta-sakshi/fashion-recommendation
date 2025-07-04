import { inngest } from "../client.js"
import { NonRetriableError } from "inngest"
import User from "../../models/user.js"
import { SendMail } from "../../utils/mailer.js";

export const onUserSignUp = inngest.createFunction(
    { id: "on-user-signup", retries: 2 },
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const { email } = event.data

            //pipeline 1;
            const user = await step.run("get-user-email", async () => {
                const userObject = await User.findOne({ email })
                if (!userObject) {
                    throw new NonRetriableError("user no longer exist in our database!!")
                }
                return userObject
            })

            //pipeline 2;
            await step.run("send-welcome-email", async () => {
                const subject = `Welcome to the app`
                const msg = `Hi,
                \n\n
                Thanks for signing up. We're glad to have you onboard!`

                await SendMail(user.email, subject, msg)
            })

            return { success: true }

        } catch (error) {
            console.error("❌ Error while running step ", error.message)
            return { success: false }
        }

    }
)