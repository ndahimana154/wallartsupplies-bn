import CustomInquiries, { CustomInquiriesAttributes } from "../database/models/CustomInquiries";

const saveInquiries = async (data: CustomInquiriesAttributes) => {
    const inquiry = await CustomInquiries.create(data);
    return inquiry
}

export default {
    saveInquiries
}