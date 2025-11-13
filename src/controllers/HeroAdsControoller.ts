import { Response } from "express"
import { sendError, sendSuccess } from "../helpers/apiResponse";
import { ExtendedRequest } from "../types/Request";
import HeroAdsRepositories from "../repositories/HeroAdsRepositories";
import { HeroAdsFilters } from "../types/HeroAdsTypes";
import { QueryOptions } from "../types/ProductTypes";

const createNewHeroAds = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const heroAd = await HeroAdsRepositories.saveHeroAds(req.body)
        return sendSuccess(res, "Hero advert saved successfully", heroAd)
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

const getAllHeroAds = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const { page, limit, title, isActive, description, sortBy, order } = req.query;

        const filters: HeroAdsFilters = {};
        if (title) filters.title = title as string;
        if (isActive !== undefined) {
            filters.isActive = isActive === 'true' || isActive === '1';
        }
        if (description) filters.description = description as string;

        const queries: QueryOptions = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 10,
            sortBy: (sortBy as string) || 'updatedAt',
            order: (order as 'ASC' | 'DESC') || 'DESC'
        };

        const heroAds = await HeroAdsRepositories.findHeroAds(filters, queries);
        return sendSuccess(res, "Hero adverts retrieved successfully", heroAds);
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

const customerGetAds = async (req: ExtendedRequest, res: Response) => {
    try {
        const { page, limit, title, isActive, description, sortBy, order } = req.query;

        const filters: HeroAdsFilters = {};
        if (title) filters.title = title as string;
        if (isActive !== undefined) {
            filters.isActive = isActive === 'true' || isActive === '1';
        }
        if (description) filters.description = description as string;

        const queries: QueryOptions = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 10,
            sortBy: (sortBy as string) || 'updatedAt',
            order: (order as 'ASC' | 'DESC') || 'DESC',
        };

        const heroAds = await HeroAdsRepositories.findHeroAds(filters, queries);
        return sendSuccess(res, "Hero adverts retrieved successfully", heroAds);
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const updateHeroAd = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const update = await HeroAdsRepositories.updateHeroAds(Number(req.heroAd?.id), req.body)
        return sendSuccess(res, "Hero ad update successfully", update)
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const deleteHeroAd = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const deleted = await HeroAdsRepositories.deleteHeroAds(Number(req.heroAd?.id));
        console.log(deleted)
        return sendSuccess(res, "Hero ad delete successfully", deleted)
    } catch (error: any) {
        return sendError(res, error.message)
    }
}


export default {
    createNewHeroAds,
    getAllHeroAds,
    customerGetAds,
    updateHeroAd,
    deleteHeroAd
}