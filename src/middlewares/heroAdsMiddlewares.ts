import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/Request";
import { sendError } from "../helpers/apiResponse";
import HeroAdsRepositories from "../repositories/HeroAdsRepositories";

export const isHeroAdsExistsById = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params
        console.log("UD", id)
        const ad = await HeroAdsRepositories.findHeroAdByAttribute("id", id);
        if (!ad) {
            return sendError(res, "Hero ad is not found", 404);
        }

        req.heroAd = ad;
        return next()
    } catch (error: any) {
        return sendError(res, error.message)
    }
}