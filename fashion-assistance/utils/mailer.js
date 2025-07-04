import nodemailer from "nodemailer"


export const SendMail = async (to, subject, text) => {
    try {
        console.log(process.env.MAILTRAP_SMTP_HOST);

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'noreply@inngest-tmc.com',
            to,
            subject,
            text,
        });

        console.log("Message sent:", info.messageId);
        return info
    } catch (error) {
        console.error("❌ Mail error ", error);
    }
}