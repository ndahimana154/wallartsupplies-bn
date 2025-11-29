import nodemailer from "nodemailer";
import { buildEmailTemplate } from "./emails/templates";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_APP_USERNAME,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

// Verify transporter configuration on startup to catch auth/connectivity issues early
transporter.verify()
    .then(() => console.log("✅ Mail transporter is ready"))
    .catch((err) => console.error("❌ Mail transporter verification failed:", err));

export const sendEmail = async ({
    to,
    subject,
    title,
    content,
    buttonText,
    buttonUrl,
    image,
}: {
    to: string;
    subject: string;
    title: string;
    content: string;
    buttonText?: string;
    buttonUrl?: string;
    image?: string;
}) => {
    const html = buildEmailTemplate({ title, content, buttonText, buttonUrl, image });

    try {
        const info = await transporter.sendMail({
            from: `"Wall Art Supplies" <${process.env.GOOGLE_APP_USERNAME}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
        return info;
    } catch (error: any) {
        console.error("❌ Failed to send email:", error && error.message ? error.message : error);
        throw error;
    }
};
