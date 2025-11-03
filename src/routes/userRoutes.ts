import express from "express"
import usersControllers from "../controllers/usersControllers";
import { isUserAlreadyExists, isUserExists, isUserExistsByUserId } from "../middlewares/userMiddlewares";
import bodyValidation from "../middlewares/validationMiddlewares";
import {
    forgotPasswordValidations,
    newUserValidations,
    resetPasswordValidations,
    userLoginValidations,
    verifyForgotPasswordToken
} from "../validations/userValidations";

const userRoutes = express.Router();

userRoutes.post("/secret-new-account", bodyValidation(newUserValidations), isUserAlreadyExists, usersControllers.createUserAccount)
userRoutes.post("/login", bodyValidation(userLoginValidations), isUserExists, usersControllers.userLogin);

userRoutes.post("/forgot-password", bodyValidation(forgotPasswordValidations), isUserExists, usersControllers.forgotPassword);
userRoutes.post("/verify-reset-token", bodyValidation(verifyForgotPasswordToken), isUserExistsByUserId, usersControllers.verifyResetPasswordToken)
userRoutes.put("/reset-password", bodyValidation(resetPasswordValidations), isUserExistsByUserId, usersControllers.resetPassword)

export default userRoutes