import express from "express"
import { isUserAuthorized } from "../middlewares/userAuthorizations"
import HeroAdsControoller from "../controllers/HeroAdsControoller"
import { isHeroAdsExistsById } from "../middlewares/heroAdsMiddlewares"
import bodyValidation from "../middlewares/validationMiddlewares"
import { editHeroAdsValidaions, newHeroAdsValidations } from "../validations/heroAdsValidations"

const heroAdsRoutes = express.Router()

heroAdsRoutes.post("/new", isUserAuthorized, bodyValidation(newHeroAdsValidations), HeroAdsControoller.createNewHeroAds)
heroAdsRoutes.get("/get-all", isUserAuthorized, HeroAdsControoller.getAllHeroAds)
heroAdsRoutes.put("/update/:id", isUserAuthorized, bodyValidation(editHeroAdsValidaions), isHeroAdsExistsById, HeroAdsControoller.updateHeroAd)
heroAdsRoutes.delete("/delete/:id", isUserAuthorized, isHeroAdsExistsById, HeroAdsControoller.deleteHeroAd)

heroAdsRoutes.get("/customer-get-ads", HeroAdsControoller.customerGetAds)

export default heroAdsRoutes