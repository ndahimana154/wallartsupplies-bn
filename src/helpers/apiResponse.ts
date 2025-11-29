import { Response } from "express";
import { ApiResponse } from "../types/Request";

export const sendSuccess = <T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};

export const sendError = (
    res: Response,
    message: string,
    statusCode: number = 500
) => {
    const response: ApiResponse<null> = {
        success: false,
        message,
        data: null,
    };
    console.error("Error happened",response)
    return res.status(statusCode).json(response);
};
