import express from "express"
import usersControllers from "../controllers/usersControllers";
import { isUserAlreadyExists, isUserExists, isUserExistsByUserId } from "../middlewares/userMiddlewares";
import bodyValidation from "../middlewares/validationMiddlewares";
import {
    forgotPasswordValidations,
    newUserValidations,
    resetPasswordValidations,
    updateUserValidations,
    userLoginValidations,
    verifyForgotPasswordToken
} from "../validations/userValidations";
import { isUserAuthorized } from "../middlewares/userAuthorizations";

const userRoutes = express.Router();

userRoutes.post("/secret-new-account", bodyValidation(newUserValidations), isUserAlreadyExists, usersControllers.createUserAccount)
userRoutes.post("/login", bodyValidation(userLoginValidations), isUserExists, usersControllers.userLogin);

userRoutes.post("/forgot-password", bodyValidation(forgotPasswordValidations), isUserExists, usersControllers.forgotPassword);
userRoutes.post("/verify-reset-token", bodyValidation(verifyForgotPasswordToken), isUserExistsByUserId, usersControllers.verifyResetPasswordToken)
userRoutes.put("/reset-password", bodyValidation(resetPasswordValidations), isUserExistsByUserId, usersControllers.resetPassword)

userRoutes.get("/profile", isUserAuthorized, usersControllers.getUserProfile);
userRoutes.put("/update-profile", isUserAuthorized, bodyValidation(updateUserValidations), usersControllers.updateUserProfile);

export default userRoutes