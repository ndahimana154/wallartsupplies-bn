import express from "express"
import inquiriesControllers from "../controllers/inquiriesControllers";
import bodyValidation from "../middlewares/validationMiddlewares";
import { newInquiryValidations } from "../validations/inquiryValidations";

const inquiriesRoute = express.Router()

inquiriesRoute.post("/new", bodyValidation(newInquiryValidations), inquiriesControllers.newInquiry);

export default inquiriesRoute