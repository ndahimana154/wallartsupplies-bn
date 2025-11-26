import { Response } from "express"
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import inquiriesRepositories from "../repositories/inquiriesRepositories";


const newInquiry = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const inquiry = await inquiriesRepositories.saveInquiries(req.body);

        return sendSuccess(res, "Inquiry Saved successfully", inquiry);
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

export default { newInquiry }