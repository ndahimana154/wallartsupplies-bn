import { Response } from "express"
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import productRepositories from "../repositories/productRepositories";
import { generateSlug } from "../helpers/productsHelpers";
import { CategoryFilters, QueryOptions } from "../types/ProductTypes";

const createNewProduct = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const slug = generateSlug(req.body.name)
        req.body.slug = slug

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

const getRecentCollections = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const products = await productRepositories.findCustomerProducts();
        return sendSuccess(res, "Products retrieved successfully", products)
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const customerGetSingleProduct = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const slug = req.params.slug
        const product = await productRepositories.customerFindSingleProductByAttribute("slug", slug);
        return sendSuccess(res, "Product retrieved successfully", product)
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
        const { page, limit, name, sortBy, order } = req.query;

        const filters: CategoryFilters = {}
        if (name) filters.name = name as string;

        const queries: QueryOptions = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 10,
            sortBy: (sortBy as string) || 'updatedAt',
            order: (order as 'ASC' | 'DESC') || 'DESC'
        };


        const categories = await productRepositories.findCategories(filters, queries);

        return sendSuccess(res, "Categories retrieved successfully", categories)
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

const customerGetBestCategories = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const categories = await productRepositories.findCategories(
            {
                name: ''
            },
            {
                sortBy: "updatedAt",
                order: "DESC",
                limit: 6
            });
        return sendSuccess(res, "Categories retrieved successfully", categories)
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

const customerGetProductsByCategory = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const category = await productRepositories.findCategoriesByAttribute("slug", req.params.slug);
        if (!category) {
            return sendError(res, "Category is not found!")
        }

        const products = await productRepositories.findCustomerProducts({ categoryId: category.id });
        return sendSuccess(res, "Category products are retrieved successfully", { category, products })

    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const updateCategory = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const updated = await productRepositories.updateCategory(Number(req.category?.id), req.body)
        return sendSuccess(res, "Category is updated successfully", updated)
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const updateProduct = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const updated = await productRepositories.updateProduct(Number(req?.product?.id), req.body)
        return sendSuccess(res, "Product updated successfully", updated)

    } catch (error: any) {
        return sendError(res, error.message)
    }
}

export default {
    createNewProduct,
    createNewCategory,
    getCategories,
    getProductsList,
    getRecentCollections,
    customerGetSingleProduct,
    customerGetBestCategories,
    customerGetProductsByCategory,
    updateCategory,
    updateProduct
}