import express from "express"
import productsControllers from "../controllers/productsControllers"
import { isCategoryAlreadyExists, isCategoryExists, isProductAlreadyExists, isProductExistsById } from "../middlewares/productsMiddleware";
import bodyValidation from "../middlewares/validationMiddlewares";
import { newCategoryValidations, newProductValidations, updateCategoryValidations } from "../validations/productsValidations";
import { isUserAuthorized } from "../middlewares/userAuthorizations";

const productsRoutes = express.Router()

productsRoutes.post("/new", isUserAuthorized, bodyValidation(newProductValidations), isProductAlreadyExists, productsControllers.createNewProduct);
productsRoutes.get("/list-all-products", isUserAuthorized, productsControllers.getProductsList);
productsRoutes.put("/edit/:id", isUserAuthorized, isProductExistsById, productsControllers.updateProduct);

productsRoutes.post("/category/new", isUserAuthorized, bodyValidation(newCategoryValidations), isCategoryAlreadyExists, productsControllers.createNewCategory);
productsRoutes.get("/category/list", isUserAuthorized, productsControllers.getCategories);
productsRoutes.put("/category/update/:id", isUserAuthorized, bodyValidation(updateCategoryValidations), isCategoryExists, productsControllers.updateCategory)

productsRoutes.get("/customer-get-recent-collections", productsControllers.getRecentCollections);
productsRoutes.get("/customer-get-product/:slug", productsControllers.customerGetSingleProduct);
productsRoutes.get("/customer-get-best-categories", productsControllers.customerGetBestCategories)
productsRoutes.get("/category/customer-get-products/:slug", productsControllers.customerGetProductsByCategory)

export default productsRoutes