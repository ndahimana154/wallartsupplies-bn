import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/Request";
import { sendError } from "../helpers/apiResponse";
import productRepositories from "../repositories/productRepositories";

export const isProductAlreadyExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const product = await productRepositories.findProductByAttribute("name", req.body.name);
        if (product) {
            return sendError(res, "Product with this name already exists!", 400);
        }

        return next();
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

export const isCategoryAlreadyExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const category = await productRepositories.findCategoriesByAttribute("name", req.body.name);
        if (category) {
            return sendError(res, "Category with this name already exists.", 400);
        }

        return next();
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

export const isCategoryExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params
        const category = await productRepositories.findCategoriesByAttribute("id", id);

        if (!category) {
            return sendError(res, "Category with this name doesn't exists.", 404);
        }

        req.category = category
        return next();
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

export const isProductExistsById = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params

        const product = await productRepositories.findProductByAttribute("id", id);

        if (!product) {
            return sendError(res, "This product doesn't exists exists!", 400);
        }

        req.product = product

        return next();

    } catch (error: any) {
        return sendError(res, error.message)
    }
}