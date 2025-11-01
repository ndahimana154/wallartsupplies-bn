import { Response, NextFunction } from "express";
import { ApiResponse, ExtendedRequest } from "../types/Request";
import userRepositories from "../repositories/userRepositories";
import { UserAttributes } from "../database/models/Users";
import { sendError } from "../helpers/apiResponse";

export const isUserAlreadyExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await userRepositories.findUserByAttribute("email", req.body.email);

        if (user) {
            return sendError(res, "User already exists", 400)
        }

        return next()

    } catch (error: any) {
        return sendError(res, error.message)
    }
}

export const isUserExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await userRepositories.findUserByAttribute("email", req.body.email);

        if (!user) {
            return sendError(res, "User doesn't exists", 400)
        }

        req.user = user
        return next()

    } catch (error: any) {
        return sendError(res, error.message)
    }
}