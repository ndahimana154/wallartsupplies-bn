import express from "express"
import { isUserAuthorized } from "../middlewares/userAuthorizations"
import HeroAdsControoller from "../controllers/HeroAdsControoller"

const heroAdsRoutes = express.Router()

heroAdsRoutes.post("/new", isUserAuthorized, HeroAdsControoller.createNewHeroAds);

export default heroAdsRoutes