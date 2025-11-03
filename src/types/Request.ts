import { Request } from "express";
import { UserAttributes } from "../database/models/Users";


export interface ExtendedRequest extends Request {
    user?: UserAttributes;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
