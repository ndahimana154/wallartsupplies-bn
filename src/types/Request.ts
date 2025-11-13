import { Request } from "express";
import { UserAttributes } from "../database/models/Users";
import { HeroAdsAttributes } from "../database/models/HeroAds";


export interface ExtendedRequest extends Request {
    user?: UserAttributes;
    heroAd?: HeroAdsAttributes
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
