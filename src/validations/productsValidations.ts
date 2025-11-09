import Joi from "joi";

export const newProductValidations = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    moq: Joi.number().required(),
    description: Joi.string().required(),
    images: Joi.array().required(),
    customAttr: Joi.array().required(),
    categoryId: Joi.number().required()
})

export const newCategoryValidations = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required()
})