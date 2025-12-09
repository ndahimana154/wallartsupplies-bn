import { Response } from "express"
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import productRepositories from "../repositories/productRepositories";
import { ProductViews, Products } from "../database/models";
import { Op, Sequelize } from "sequelize";
import { generateSlug } from "../helpers/productsHelpers";
import { CategoryFilters, ProductFilters, QueryOptions } from "../types/ProductTypes";

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

        const queries: QueryOptions = {}
        const filters: ProductFilters = {}

        if (req.query.name) filters.name = String(req.query.name)

        if (req.query.page) queries.page = Number(req.query.page);
        if (req.query.limit) queries.limit = Number(req.query.limit);
        if (req.query.sortBy) queries.sortBy = String(req.query.sortBy);
        if (req.query.order) queries.order = String(req.query.order);

        const products = await productRepositories.findCustomerProducts(filters, queries);
        return sendSuccess(res, "Products retrieved successfully", products);
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const customerGetSingleProduct = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const slug = req.params.slug
        const product = await productRepositories.customerFindSingleProductByAttribute("slug", slug, { userId: req.user?.id ?? null, ip: req.ip ?? null });
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
        console.log('Updating product with ID:', req?.product?.id);
        const updated = await productRepositories.updateProduct(Number(req?.product?.id), req.body)
        return sendSuccess(res, "Product updated successfully", updated)

    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const getDashboardData = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const products = await productRepositories.findAllProducts();
        const categories = await productRepositories.findCategories();

        const totalViews = await ProductViews.count();

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const viewsToday = await ProductViews.count({
            where: {
                viewedAt: { [Op.gte]: startOfToday }
            }
        });

        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        twelveMonthsAgo.setHours(0, 0, 0, 0);

        const dateTruncMonth = Sequelize.fn('date_trunc', 'month', Sequelize.col('viewedAt'));

        const last12MonthsRaw = await ProductViews.findAll({
            attributes: [
                [dateTruncMonth, 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
            ],
            where: {
                viewedAt: { [Op.gte]: twelveMonthsAgo }
            },
            group: [dateTruncMonth],
            order: [[dateTruncMonth, 'ASC']]
        });

        let last12MonthsTotalViews = 0;
        const last12MonthsAnalytics: { month: string; views: number }[] = [];

        for (const r of last12MonthsRaw as any[]) {
            const monthVal = r.get('month');
            const d = monthVal instanceof Date ? monthVal : new Date(monthVal);
            const monthKey = d.toISOString().slice(0, 7);
            const views = Number(r.get('count') ?? 0);

            last12MonthsAnalytics.push({ month: monthKey, views });
            last12MonthsTotalViews += views;
        }


        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const topProductsRaw = await ProductViews.findAll({
            attributes: [
                'productId',
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'viewsCount']
            ],
            where: {
                viewedAt: { [Op.gte]: thirtyDaysAgo }
            },
            group: ['productId'],
            order: [[Sequelize.literal('COUNT(*)'), 'DESC']],
            limit: 5
        });

        const topIds = topProductsRaw.map((r: any) => Number(r.get('productId')));

        const countsById: Record<number, number> = {};
        for (const r of topProductsRaw) {
            countsById[Number(r.get('productId'))] = Number(r.get('viewsCount') ?? 0);
        }

        const productsDetails = await Products.findAll({
            where: { id: topIds },
            attributes: ['id', 'name', 'slug', 'price', 'images']
        });

        const productMap: Record<number, any> = {};
        for (const p of productsDetails) productMap[p.id] = p;

        const topProductsByViews = topIds.map(id => ({
            productId: id,
            views: countsById[id] || 0,
            product: productMap[id] || null
        }));

        return sendSuccess(res, "Dashboard data retrieved successfully", {
            dashboard: {
                totalProducts: products.length,
                totalCategories: categories.data.length,
                totalViews,
                viewsToday,
                last12MonthsTotalViews,
                last12MonthsAnalytics
            },
            data: {
                products: products.slice(0, 4),
                categories: categories.data,
                topProductsByViews
            }
        });

    } catch (error: any) {
        return sendError(res, error.message);
    }
};

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
    updateProduct,
    getDashboardData
}