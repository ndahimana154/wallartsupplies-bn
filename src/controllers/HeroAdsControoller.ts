import { Response } from "express"
import { sendError, sendSuccess } from "../helpers/apiResponse";
import { ExtendedRequest } from "../types/Request";
import HeroAdsRepositories from "../repositories/HeroAdsRepositories";

const createNewHeroAds = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        console.log(req.body)
        const heroAd = await HeroAdsRepositories.saveHeroAds(req.body)
        return sendSuccess(res, "Hero advert saved successfully", heroAd)
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

export default {
    createNewHeroAds
}