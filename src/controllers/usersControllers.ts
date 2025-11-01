import { Response } from "express";
import { ExtendedRequest, ApiResponse } from "../types/Request";
import userRepositories from "../repositories/userRepositories";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import { comparePassword, generateToken, hashPassword } from "../helpers/authHelpers";

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

        const token = await generateToken(String(req?.user?.email))
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


export default {
    createUserAccount,
    userLogin
}