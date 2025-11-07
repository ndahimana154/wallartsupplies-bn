import express from "express"
import userRoutes from "./userRoutes"
import productsRoutes from "./productRoutes";

const indexRoutes = express.Router()

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/product", productsRoutes);

export default indexRoutes