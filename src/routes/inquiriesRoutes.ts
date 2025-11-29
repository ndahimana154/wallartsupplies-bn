import express from "express"
import inquiriesControllers from "../controllers/inquiriesControllers";
import bodyValidation from "../middlewares/validationMiddlewares";
import { newInquiryValidations, toggleResolvedStatusValidations } from "../validations/inquiryValidations";
import { isUserAuthorized } from "../middlewares/userAuthorizations";

const inquiriesRoute = express.Router()

inquiriesRoute.post("/new", bodyValidation(newInquiryValidations), inquiriesControllers.newInquiry);
inquiriesRoute.get("/all", inquiriesControllers.getAllInquiries);

inquiriesRoute.put("/toggle-resolved/:id", isUserAuthorized, bodyValidation(toggleResolvedStatusValidations),
    inquiriesControllers.toggleResolvedStatus);

export default inquiriesRoute