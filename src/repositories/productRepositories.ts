import { Op, Sequelize } from "sequelize";
import { Categories } from "../database/models";
import { CategoriesAttributes } from "../database/models/Categories";
import Products, { ProductsAttributes } from "../database/models/Products";
import ProductViews from "../database/models/ProductViews";
import { CategoryFilters, ProductFilters, QueryOptions, iCategoryData, iProductData } from "../types/ProductTypes";

const saveProduct = async (data: ProductsAttributes) => {
    const product = await Products.create(data);
    return product
}

const findProductByAttribute = async (key: string, value: string) => {
    const product = await Products.findOne({
        where: {
            [key]: value
        }
    })
    return product
}

const findAllProducts = async () => {
    const products = await Products.findAll({
        order: [['createdAt', 'DESC']],
        include: [{
            model: Categories,
            as: "category",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }]
    });
    return products
};

const findCustomerProducts = async (filters: ProductFilters = {}, queries: QueryOptions = {}) => {
    const { name, status = true, description } = filters;
    const { page = 1, limit = 10, sortBy = "createdAt", order = "DESC" } = queries

    console.log("Filters", filters)
    console.log("Queries", queries)

    const where: any = {}

    if (name) {
        where.name = { [Op.like]: `%${name}%` }
    }
    if (status) {
        where.status = status
    }
    if (description) {
        where.name = { [Op.like]: `%${description}%` }
    }

    const offset = (page - 1) * limit

    const { count, rows } = await Products.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, order]],
        include: [{
            model: Categories,
            as: "category",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }]
    });

    return {
        data: rows,
        pagination: {
            total: count,
            page, limit, totalPages: Math.ceil(count / limit)
        }
    }
};

const customerFindSingleProductByAttribute = async (key: string, value: string, meta: { userId?: number | null; ip?: string | null } = {}) => {
    const product = await Products.findOne({
        where: {
            [key]: value,
            status: true
        },
        include: [{
            model: Categories,
            as: "category",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }]
    });

    if (!product) {
        return null;
    }

    // Increment views counter atomically to handle concurrent requests
    try {
        await product.increment('views', { by: 1 });
        // reload instance to get updated views value
        await product.reload();
    } catch (err) {
        // don't block the response if increment fails; log and continue
        console.error('Failed to increment product views for id', product.id, err);
    }

    // Record detailed view event for statistics (non-blocking)
    try {
        await ProductViews.create({
            productId: product.id,
            userId: meta.userId ?? null,
            ipAddress: meta.ip ?? null,
            viewedAt: new Date()
        });
    } catch (err) {
        console.error('Failed to record product view event for id', product.id, err);
    }

    let relatedProducts = await Products.findAll({
        where: {
            id: { [Op.ne]: product.id },
            categoryId: product.categoryId,
            status: true
        },
        include: [{
            model: Categories,
            as: "category",
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }],
        limit: 6,
        order: [['createdAt', 'DESC']]
    });

    if (relatedProducts.length < 6) {
        const remainingCount = 6 - relatedProducts.length;
        const excludedIds = [product.id, ...relatedProducts.map(p => p.id)];

        const additionalProducts = await Products.findAll({
            where: {
                id: { [Op.notIn]: excludedIds },
                categoryId: { [Op.ne]: product.categoryId },
                status: true
            },
            include: [{
                model: Categories,
                as: "category",
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
            limit: remainingCount,
            order: [['createdAt', 'DESC']]
        });

        relatedProducts = [...relatedProducts, ...additionalProducts];
    }

    return {
        ...product.toJSON(),
        relatedProducts
    };
};

const findCategoriesByAttribute = async (key: string, value: string) => {
    const category = await Categories.findOne({
        where: {
            [key]: value
        }
    })
    return category
}

const saveCategory = async (data: CategoriesAttributes) => {
    const category = await Categories.create(data);
    return category
}


const findCategories = async (filters: CategoryFilters = {}, queries: QueryOptions = {}) => {
    const { name } = filters;
    const { page = 1, limit = 10, sortBy = "createdAt", order = "DESC" } = queries;

    const where: any = {};

    if (name) {
        where.name = { [Op.like]: `%${name}%` };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Categories.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, order]],
    });

    return {
        data: rows,
        pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
        },
    };
};

const updateCategory = async (id: number, data: iCategoryData) => {
    const [affectedCount] = await Categories.update(data, {
        where: { id }
    })

    if (affectedCount === 0) {
        throw new Error("Category is not found or no changes made")
    }

    const updatedCategory = await Categories.findByPk(id)

    return {
        affectedCount,
        updatedCategory
    }
}

const updateProduct = async (id: number, data: iProductData) => {
    const [affectedCount] = await Products.update(data, {
        where: { id }
    })
    if (affectedCount === 0) {
        throw new Error("Product is not found or not changed")
    }

    const updatedProduct = await Products.findByPk(id);

    return {
        affectedCount,
        updatedProduct
    }
}
export default {
    saveProduct,
    findProductByAttribute,
    findAllProducts,
    findCategoriesByAttribute,
    saveCategory,
    findCategories,
    findCustomerProducts,
    customerFindSingleProductByAttribute,
    updateCategory,
    updateProduct
}