import { Op } from "sequelize";
import { Categories } from "../database/models";
import { CategoriesAttributes } from "../database/models/Categories";
import Products, { ProductsAttributes } from "../database/models/Products";
import { CategoryFilters, ProductFilters, QueryOptions } from "../types/ProductTypes";

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

const customerFindSingleProductByAttribute = async (key: string, value: string) => {
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
    })

    return product
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
    const { name, status, createdFrom, createdTo } = filters;
    const { page = 1, limit = 10, sortBy = "createdAt", order = "DESC" } = queries;

    const where: any = {};

    if (name) {
        where.name = { [Op.like]: `%${name}%` };
    }
    if (status) {
        where.status = status;
    }
    if (createdFrom && createdTo) {
        where.createdAt = { [Op.between]: [createdFrom, createdTo] };
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

export default {
    saveProduct,
    findProductByAttribute,
    findAllProducts,
    findCategoriesByAttribute,
    saveCategory,
    findCategories,
    findCustomerProducts,
    customerFindSingleProductByAttribute
}