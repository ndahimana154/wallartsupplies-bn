import express from "express"
import productsControllers from "../controllers/productsControllers"
import { isCategoryAlreadyExists, isProductAlreadyExists } from "../middlewares/productsMiddleware";
import bodyValidation from "../middlewares/validationMiddlewares";
import { newCategoryValidations, newProductValidations } from "../validations/productsValidations";

const productsRoutes = express.Router()

productsRoutes.post("/new", bodyValidation(newProductValidations), isProductAlreadyExists, productsControllers.createNewProduct);
productsRoutes.get("/list-all-products", productsControllers.getProductsList);

productsRoutes.post("/category/new", bodyValidation(newCategoryValidations), isCategoryAlreadyExists, productsControllers.createNewCategory);
productsRoutes.get("/category/list", productsControllers.getCategories);

export default productsRoutes