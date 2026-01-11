import { Op } from "sequelize";
import CustomInquiries, { CustomInquiriesAttributes } from "../database/models/CustomInquiries";
import { InquiriesFilters } from "../types/InquiriesTypes";
import { QueryOptions } from "../types/ProductTypes";

const saveInquiries = async (data: CustomInquiriesAttributes) => {
    const inquiry = await CustomInquiries.create(data);
    return inquiry
}


const findAllInquiries = async (filters: InquiriesFilters = {}, queries: QueryOptions) => {
    const { page = 1, limit = 10, sortBy = "createdAt", order = "DESC" } = queries;
    const { fullNames, email, phone, status } = filters;

    const orConditions: any[] = [];

    if (fullNames) {
        orConditions.push({ fullNames: { [Op.iLike]: `%${fullNames}%` } });
    }

    if (email) {
        orConditions.push({ email: { [Op.iLike]: `%${email}%` } });
    }

    if (phone) {
        orConditions.push({ phone: { [Op.iLike]: `%${phone}%` } });
    }

    if (status) {
        orConditions.push({ status }); // Shorthand for { status: status }
    }

    const where = orConditions.length > 0 ? { [Op.or]: orConditions } : {};

    console.log(where);
    const offset = (page - 1) * limit;

    const { count, rows } = await CustomInquiries.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, order]],
    });

    return {
        data: rows,
        pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        }
    };
};

const updateInquiriesStatus = async (id: any, status: string) => {
    const inquiry = await CustomInquiries.findByPk(id);
    if (!inquiry) {
        throw new Error("Inquiry not found");
    }
    inquiry.status = status;
    await inquiry.save();
    return inquiry;
}

export default {
    saveInquiries,
    findAllInquiries,
    updateInquiriesStatus
}