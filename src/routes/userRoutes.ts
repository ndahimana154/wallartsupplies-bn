import express from "express"
import usersControllers from "../controllers/usersControllers";
import { isUserAlreadyExists, isUserExists } from "../middlewares/userMiddlewares";
import bodyValidation from "../middlewares/validationMiddlewares";
import {
    newUserValidations,
    userLoginValidations
} from "../validations/userValidations";

const userRoutes = express.Router();

userRoutes.post("/secret-new-account", bodyValidation(newUserValidations), isUserAlreadyExists, usersControllers.createUserAccount)
userRoutes.post("/login", bodyValidation(userLoginValidations), isUserExists, usersControllers.userLogin);

export default userRoutes