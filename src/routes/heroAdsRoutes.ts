import express from "express"
import { isUserAuthorized } from "../middlewares/userAuthorizations"
import HeroAdsControoller from "../controllers/HeroAdsControoller"

const heroAdsRoutes = express.Router()

heroAdsRoutes.post("/new", isUserAuthorized, HeroAdsControoller.createNewHeroAds)
heroAdsRoutes.get("/get-all", isUserAuthorized, HeroAdsControoller.getAllHeroAds)

export default heroAdsRoutes