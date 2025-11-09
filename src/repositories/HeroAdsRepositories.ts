import HeroAds, { HeroAdsAttributes } from "../database/models/HeroAds";

const saveHeroAds = async (data: HeroAdsAttributes) => {
    const heroAds = await HeroAds.create(data);
    return heroAds
}

export default {
    saveHeroAds
}