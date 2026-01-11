import { Op } from "sequelize";
import HeroAds, { HeroAdsAttributes } from "../database/models/HeroAds";
import { HeroAdsFilters } from "../types/HeroAdsTypes";
import { QueryOptions } from "../types/ProductTypes";

const saveHeroAds = async (data: HeroAdsAttributes) => {
    const heroAds = await HeroAds.create(data);
    return heroAds
}


const findHeroAds = async (filters: HeroAdsFilters = {}, queries: QueryOptions = {}) => {
    const { title, isActive, description } = filters;
    const { page = 1, limit = 10, sortBy = "updatedAt", order = "DESC" } = queries;

    const where: any = {};

    if (title) {
        where.title = { [Op.iLike]: `%${title}%` };
    }

    if (isActive !== undefined) {
        where.isActive = isActive;
    }

    if (description) {
        where.description = { [Op.iLike]: `%${description}%` };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await HeroAds.findAndCountAll({
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
            totalPages: Math.ceil(count / limit)
        }
    };
}

const findHeroAdByAttribute = async (key: string, value: any) => {
    const ad = await HeroAds.findOne({
        where: {
            [key]: value
        }
    })
    return ad
}

const updateHeroAds = async (id: number, data: HeroAdsAttributes) => {
    const [affectedCount] = await HeroAds.update(data, {
        where: { id }
    });

    if (affectedCount === 0) {
        throw new Error('HeroAd not found or no changes made');
    }

    const updatedHeroAd = await HeroAds.findByPk(id);

    return {
        affectedCount,
        updatedHeroAd
    };
};

const deleteHeroAds = async (id: number) => {
    return await HeroAds.destroy({ where: { id } })
}

export default {
    saveHeroAds,
    findHeroAds,
    findHeroAdByAttribute,
    updateHeroAds,
    deleteHeroAds
}