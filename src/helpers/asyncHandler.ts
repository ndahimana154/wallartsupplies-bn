import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/Request";

export const asyncHandler =
    (fn: (req: ExtendedRequest, res: Response, next: NextFunction) => Promise<any>) =>
        (req: ExtendedRequest, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
