import express from "express"
import userRoutes from "./userRoutes"
import productsRoutes from "./productRoutes";
import heroAdsRoutes from "./heroAdsRoutes";
import inquiriesRoute from "./inquiriesRoutes";

const indexRoutes = express.Router()

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/product", productsRoutes);
indexRoutes.use("/hero-ads", heroAdsRoutes);
indexRoutes.use("/inquiries", inquiriesRoute);

export default indexRoutes