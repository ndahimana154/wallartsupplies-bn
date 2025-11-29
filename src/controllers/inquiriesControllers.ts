import { Response } from "express"
import { ExtendedRequest } from "../types/Request";
import { sendError, sendSuccess } from "../helpers/apiResponse";
import inquiriesRepositories from "../repositories/inquiriesRepositories";
import { InquiriesFilters } from "../types/InquiriesTypes";
import { QueryOptions } from "../types/ProductTypes";


const newInquiry = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const inquiry = await inquiriesRepositories.saveInquiries(req.body);

        return sendSuccess(res, "Inquiry Saved successfully", inquiry);
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const getAllInquiries = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const {
            page,
            limit,
            fullNames, email, phone, sortBy, order
            ,
            status
        } = req.query;

        const filters: InquiriesFilters = {};
        if (fullNames) filters.fullNames = fullNames as string;
        if (email) filters.email = email as string;
        if (phone) filters.phone = phone as string;
        if (status) filters.status = status as string;

        const queries: QueryOptions = {
            page: parseInt(page as string) || 1,
            limit: parseInt(limit as string) || 10,
            sortBy: (sortBy as string) || 'createdAt',
            order: (order as 'ASC' | 'DESC') || 'DESC'
        }

        const inquiries = await inquiriesRepositories.findAllInquiries(filters, queries);

        return sendSuccess(res, "Inquiries fetched successfully", inquiries);
    } catch (error: any) {
        return sendError(res, error.message)
    }
}

const toggleResolvedStatus = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const updatedInquiry = await inquiriesRepositories.updateInquiriesStatus(id, req.body.status);

        return sendSuccess(res, "Inquiry resolved status toggled successfully", updatedInquiry);
    } catch (error: any) {
        return sendError(res, error.message);
    }
}

export default {
    newInquiry,
    getAllInquiries,
    toggleResolvedStatus
}