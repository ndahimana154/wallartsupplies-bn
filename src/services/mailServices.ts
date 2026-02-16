import nodemailer from "nodemailer";
import { buildEmailTemplate } from "./emails/templates";

const smtpUser = process.env.SPRING_MAIL_USERNAME;
const smtpPass = process.env.SPRING_MAIL_PASSWORD;
const smtpHost = process.env.SPRING_MAIL_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SPRING_MAIL_PORT || 465);
const startTls = process.env.SPRING_MAIL_STARTTLS_ENABLE === "true";
const smtpDebug = process.env.SPRING_MAIL_DEBUG === "true";
const mailFrom = process.env.MAIL_FROM || `"Jinua Hanji Trading LTD" <sales@hanjji.com>`;

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports (e.g. 587)
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    requireTLS: startTls,
    debug: smtpDebug,
});

transporter.verify()
    .then(() => console.log("✅ Mail transporter is ready", { host: smtpHost, port: smtpPort }))
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
            from: mailFrom,
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
