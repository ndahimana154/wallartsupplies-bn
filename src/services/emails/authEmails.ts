import { sendEmail } from "../mailServices";

const sendForgotPasswordEmail = async (to: string, userId: number, token: string) => {

    await sendEmail({
        to,
        subject: "Reset your Hanji Trading LTD password",
        title: "Reset Your Password",
        content: `We received a request to reset your password. Click the button below to set a new one. This link will expire in 1 hour.`,
        buttonText: "Reset Password",
        buttonUrl: `${process.env.FRONTEND_URL}/a/verify-reset?token=${token}&userId=${userId}`,
    });
}

export default {
    sendForgotPasswordEmail
}