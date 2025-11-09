import { NextFunction, Response, Request } from "express";
import { SessionAttributes } from "../database/models/Session";
import { UserAttributes } from "../database/models/Users";
import { decodeToken } from "../helpers/authHelpers";
import userRepositories from "../repositories/userRepositories";

declare global {
    namespace Express {
        interface Request {
            user?: UserAttributes;
            session?: SessionAttributes;
        }
    }
}

export const isUserAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                status: 401,
                message: "No token provided",
            });
            return;
        }

        const decoded: any = await decodeToken(token)

        const session = await userRepositories.findSessionBy2Attribute(
            "userId",
            decoded.id,
            "token",
            token
        );

        if (!session) {
            res.status(401).json({
                status: 401,
                message: "Session expired!",
            });
            return;
        }

        const user = await userRepositories.findUserByAttribute("id", decoded.id);

        if (!user) {
            res.status(401).json({
                status: 401,
                message: "User not found!",
            });
            return;
        }

        // if (!(user.status)) {
        //     res.status(401).json({
        //         status: 401,
        //         message: "User is disabled for access, contact system admin for support!",
        //     });
        //     return;
        // }

        req.user = user;
        req.session = session;
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};