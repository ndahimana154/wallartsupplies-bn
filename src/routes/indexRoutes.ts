import express from "express"
import userRoutes from "./userRoutes"
import productsRoutes from "./productRoutes";
import heroAdsRoutes from "./heroAdsRoutes";

const indexRoutes = express.Router()

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/product", productsRoutes);
indexRoutes.use("/hero-ads", heroAdsRoutes);

export default indexRoutes