import Joi from "joi";

export const newHeroAdsValidations = Joi.object({
    title: Joi.string()
        .required()
        .min(5)
        .max(60),
    description: Joi.string()
        .required()
        .min(20)
        .max(200),
    buttonText: Joi.string()
        .required()
        .max(25),
    link: Joi.string()
        .required(),
    image: Joi.string().required()
})

export const editHeroAdsValidaions = Joi.object({
    title: Joi.string()
        .optional()
        .min(5)
        .max(60),
    description: Joi.string()
        .optional()
        .min(20)
        .max(200),
    buttonText: Joi.string()
        .optional()
        .max(25),
    link: Joi.string()
        .optional(),
    image: Joi.string().optional()
})