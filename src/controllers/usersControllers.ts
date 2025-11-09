import { Response } from "express";
import { ExtendedRequest } from "../types/Request";
import userRepositories from "../repositories/userRepositories";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import { comparePassword, generateToken, hashPassword, verifyToken } from "../helpers/authHelpers";
import authEmails from "../services/emails/authEmails";

const createUserAccount = async (
    req: ExtendedRequest,
    res: Response
): Promise<any> => {
    try {
        const password = await hashPassword(req.body.password);
        req.body.password = password

        const user = await userRepositories.saveNewUser(req.body);
        return sendSuccess(res, "User created successfully", user);
    } catch (error: any) {
        return sendError(res, error.message)
    }
};

const userLogin = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const isAuthenticated = await comparePassword(req.body.password, req?.user?.password || "");

        if (!isAuthenticated) {
            return sendError(res, "You entered wrong email or password.", 400)
        }

        const token = await generateToken(String(req?.user?.id))
        const session = await userRepositories.saveSession({ token, userId: Number(req?.user?.id) })

        const { password, ...safeUser } = req?.user || {}

        return sendSuccess(res, "User login succeed", {
            session,
            user: safeUser
        })
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const forgotPassword = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const token = await generateToken(String(req?.user?.email));
        await userRepositories.saveSession({ userId: Number(req?.user?.id), token });
        await authEmails.sendForgotPasswordEmail(String(req?.user?.email), Number(req?.user?.id), token)

        return sendSuccess(res, "We have sent the next steps to your email inbox", 200);
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const verifyResetPasswordToken = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const session = await userRepositories.findSessionBy2Attribute("userId", req.body.userId, "token", req.body.token);
        const isToken = await verifyToken(req.body.token)
        // console.log("session", session)

        if (!session || !isToken) {
            return sendError(res, "Invalid or expired token");
        }

        return sendSuccess(res, "Token is valid");

    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const resetPassword = async (req: ExtendedRequest, res: Response) => {
    try {
        const { userId, token, password } = req.body;

        const session = await userRepositories.findSessionBy2Attribute("userId", userId, "token", token);
        const isTokenValid = await verifyToken(token);

        console.log("SS", session?.dataValues?.id);

        if (!session || !isTokenValid) {
            return sendError(res, "Invalid or expired token", 400);
        }

        const hashedPassword = await hashPassword(password);

        const updatedUser = await userRepositories.updateUser(Number(userId), { password: hashedPassword });

        await userRepositories.deleteSession(Number(session.id));

        return sendSuccess(res, "User password reset successfully", updatedUser);
    } catch (error: any) {
        return sendError(res, error.message);
    }
};

export default {
    createUserAccount,
    userLogin,
    forgotPassword,
    verifyResetPasswordToken,
    resetPassword
}