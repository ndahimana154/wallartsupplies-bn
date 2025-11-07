import { Response } from "express"
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import productRepositories from "../repositories/productRepositories";
import { generateSlug } from "../helpers/productsHelpers";

const createNewProduct = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const slug = generateSlug(req.body.name)
        req.body.slug = slug

        console.log("DDD", req.body)

        const product = await productRepositories.saveProduct(req.body)
        return sendSuccess(res, "Product create successfully", product)

    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const getProductsList = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const products = await productRepositories.findAllProducts();
        return sendSuccess(res, "Products retrieved successfully", products)
    } catch (error: any) {
        return sendError(res, error.message)
    }
}




const createNewCategory = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const slug = generateSlug(req.body.name);
        req.body.slug = slug

        const category = await productRepositories.saveCategory(req.body);
        return sendSuccess(res, "Category created successfully", category)
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const getCategories = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const categories = await productRepositories.findCategories();

        return sendSuccess(res, "Categories retrieved successfully", categories)
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

export default {
    createNewProduct,
    createNewCategory,
    getCategories,
    getProductsList
}