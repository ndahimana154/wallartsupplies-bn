import Joi from "joi";

export const newInquiryValidations = Joi.object({
    fullNames: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string(),
    projectDescription: Joi.string().required(),
    images: Joi.array().required(),
})

export const toggleResolvedStatusValidations = Joi.object({
    status: Joi.string().valid('RESOLVED', 'UNRESOLVED').required(),
})