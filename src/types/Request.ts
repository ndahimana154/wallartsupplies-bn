import { Request } from "express";
import { UserAttributes } from "../database/models/Users";
import { HeroAdsAttributes } from "../database/models/HeroAds";
import { CategoriesAttributes } from "../database/models/Categories";
import { ProductsAttributes } from "../database/models/Products";


export interface ExtendedRequest extends Request {
    user?: UserAttributes;
    heroAd?: HeroAdsAttributes;
    category?: CategoriesAttributes;
    product?: ProductsAttributes;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
